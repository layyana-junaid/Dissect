import { useState, useRef, useCallback } from 'react'
import HeroSection from './components/HeroSection'
import InputPanel from './components/InputPanel'
import AgentCard from './components/AgentCard'
import SynthesisPanel from './components/SynthesisPanel'

const AGENT_CONFIG = {
  technical_skeptic: {
    name: 'Technical Skeptic',
    tagline: 'Attacks feasibility & scalability',
    color: 'border-l-steel-blue',
  },
  market_critic: {
    name: 'Market Critic',
    tagline: 'Attacks market viability',
    color: 'border-l-crimson',
  },
  ethics_advocate: {
    name: 'Ethics Devil\'s Advocate',
    tagline: 'Exposes ethical risks',
    color: 'border-l-purple',
  },
  lazy_user: {
    name: 'Lazy User Tester',
    tagline: 'Attacks UX friction',
    color: 'border-l-forest-green',
  },
}

function App() {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [hasStarted, setHasStarted] = useState(false)
  const [agentOutputs, setAgentOutputs] = useState({
    technical_skeptic: { content: '', isStreaming: false, isDone: false, hasError: false },
    market_critic: { content: '', isStreaming: false, isDone: false, hasError: false },
    ethics_advocate: { content: '', isStreaming: false, isDone: false, hasError: false },
    lazy_user: { content: '', isStreaming: false, isDone: false, hasError: false },
  })
  const [synthesisOutput, setSynthesisOutput] = useState({
    content: '',
    isStreaming: false,
    isDone: false,
    hasError: false,
  })
  const [showSynthesis, setShowSynthesis] = useState(false)
  const [allDone, setAllDone] = useState(false)

  const abortControllerRef = useRef(null)
  const resultsRef = useRef(null)

  const scrollToResults = useCallback(() => {
    if (resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [])

  const handleAnalyze = useCallback(async (idea, file) => {
    setIsAnalyzing(true)
    setHasStarted(true)
    setAllDone(false)
    setShowSynthesis(false)

    setAgentOutputs({
      technical_skeptic: { content: '', isStreaming: true, isDone: false, hasError: false },
      market_critic: { content: '', isStreaming: true, isDone: false, hasError: false },
      ethics_advocate: { content: '', isStreaming: true, isDone: false, hasError: false },
      lazy_user: { content: '', isStreaming: true, isDone: false, hasError: false },
    })
    setSynthesisOutput({ content: '', isStreaming: false, isDone: false, hasError: false })

    setTimeout(scrollToResults, 100)

    abortControllerRef.current = new AbortController()

    try {
      const formData = new FormData()
      if (idea) {
        formData.append('idea', idea)
      }
      if (file) {
        formData.append('file', file)
      }

      const response = await fetch('http://localhost:8000/analyze', {
        method: 'POST',
        body: formData,
        signal: abortControllerRef.current.signal,
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.detail || 'Analysis failed')
      }

      const reader = response.body.getReader()
      const decoder = new TextDecoder()
      let buffer = ''

      while (true) {
        const { done, value } = await reader.read()

        if (done) break

        buffer += decoder.decode(value, { stream: true })
        const lines = buffer.split('\n\n')
        buffer = lines.pop() || ''

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
              const data = JSON.parse(line.slice(6))
              const { agent, chunk, is_done: isDone, is_error: isError } = data

              if (agent === 'done') {
                setIsAnalyzing(false)
                setAllDone(true)
                continue
              }

              if (agent === 'critiques_complete') {
                setShowSynthesis(true)
                setSynthesisOutput(prev => ({ ...prev, isStreaming: true }))
                continue
              }

              if (agent === 'synthesis') {
                setSynthesisOutput(prev => ({
                  ...prev,
                  content: prev.content + chunk,
                  isStreaming: !isDone,
                  isDone: isDone,
                  hasError: isError,
                }))
                continue
              }

              if (agent in AGENT_CONFIG) {
                setAgentOutputs(prev => ({
                  ...prev,
                  [agent]: {
                    ...prev[agent],
                    content: prev[agent].content + chunk,
                    isStreaming: !isDone,
                    isDone: isDone,
                    hasError: isError,
                  },
                }))
              }
            } catch (parseError) {
              console.error('Failed to parse SSE data:', parseError)
            }
          }
        }
      }
    } catch (error) {
      if (error.name === 'AbortError') {
        console.log('Analysis aborted')
      } else {
        console.error('Analysis error:', error)
        Object.keys(AGENT_CONFIG).forEach(agent => {
          setAgentOutputs(prev => ({
            ...prev,
            [agent]: {
              ...prev[agent],
              content: prev[agent].content || `Error: ${error.message}`,
              isStreaming: false,
              isDone: true,
              hasError: true,
            },
          }))
        })
      }
      setIsAnalyzing(false)
      setAllDone(true)
    }
  }, [scrollToResults])

  const handleReset = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }
    setIsAnalyzing(false)
    setHasStarted(false)
    setAllDone(false)
    setShowSynthesis(false)
    setAgentOutputs({
      technical_skeptic: { content: '', isStreaming: false, isDone: false, hasError: false },
      market_critic: { content: '', isStreaming: false, isDone: false, hasError: false },
      ethics_advocate: { content: '', isStreaming: false, isDone: false, hasError: false },
      lazy_user: { content: '', isStreaming: false, isDone: false, hasError: false },
    })
    setSynthesisOutput({ content: '', isStreaming: false, isDone: false, hasError: false })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  return (
    <div className="min-h-screen bg-cream">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-cream/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <h1 className="font-display text-2xl font-bold text-crimson">
              Dissect
            </h1>
            <p className="hidden sm:block text-text-secondary text-sm">
              Stress-test your ideas before the world does
            </p>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <HeroSection />

        <div id="input-section">
          <InputPanel
            onAnalyze={handleAnalyze}
            isAnalyzing={isAnalyzing}
            onReset={handleReset}
            hasStarted={hasStarted}
            allDone={allDone}
          />
        </div>

        {hasStarted && (
          <div ref={resultsRef} className="mt-12">
            <h2 className="font-display text-2xl font-semibold text-text-primary mb-6 text-center">
              The Verdict
            </h2>

            {/* Agent Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {Object.entries(AGENT_CONFIG).map(([agentId, config], index) => (
                <AgentCard
                  key={agentId}
                  agentId={agentId}
                  name={config.name}
                  tagline={config.tagline}
                  colorClass={config.color}
                  content={agentOutputs[agentId].content}
                  isStreaming={agentOutputs[agentId].isStreaming}
                  isDone={agentOutputs[agentId].isDone}
                  hasError={agentOutputs[agentId].hasError}
                  delay={index * 100}
                />
              ))}
            </div>

            {/* Synthesis Panel */}
            {showSynthesis && (
              <SynthesisPanel
                content={synthesisOutput.content}
                isStreaming={synthesisOutput.isStreaming}
                isDone={synthesisOutput.isDone}
                hasError={synthesisOutput.hasError}
              />
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-text-secondary text-sm">
            Built with adversarial AI agents. Your ideas deserve the harshest critics.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App
