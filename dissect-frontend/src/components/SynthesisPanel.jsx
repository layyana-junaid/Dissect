import { useState, useCallback } from 'react'
import ReactMarkdown from 'react-markdown'

function SynthesisPanel({ content, isStreaming, isDone, hasError }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(content)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }, [content])

  return (
    <div className="card animate-fade-in-up border-t-4 border-t-gold">
      {/* Header with gradient */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <svg className="w-7 h-7 text-crimson" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          <div>
            <h3 className="font-display text-xl font-bold bg-gradient-to-r from-crimson to-gold bg-clip-text text-transparent">
              Dissected & Rebuilt
            </h3>
            <p className="text-sm text-text-secondary">
              Your idea, fortified against criticism
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Status */}
          {isStreaming && (
            <div className="flex items-center gap-1.5">
              <span className="streaming-dot" />
              <span className="text-xs text-crimson font-medium">Synthesizing</span>
            </div>
          )}
          {isDone && !hasError && (
            <span className="text-forest-green text-sm font-medium">Complete</span>
          )}

          {/* Copy Button */}
          {content && isDone && !hasError && (
            <button
              onClick={handleCopy}
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border hover:bg-cream transition-colors text-sm font-medium"
            >
              {copied ? (
                <>
                  <svg className="w-4 h-4 text-forest-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Copied!
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  Copy
                </>
              )}
            </button>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="min-h-[200px] max-h-[600px] overflow-y-auto">
        {!content && isStreaming && (
          <div className="space-y-4">
            <div className="skeleton h-4 w-full" />
            <div className="skeleton h-4 w-5/6" />
            <div className="skeleton h-4 w-full" />
            <div className="skeleton h-4 w-4/6" />
            <div className="skeleton h-4 w-full" />
            <div className="skeleton h-4 w-3/4" />
            <div className="skeleton h-4 w-full" />
            <div className="skeleton h-4 w-5/6" />
          </div>
        )}

        {content && (
          <div className={`prose prose-lg max-w-none text-text-primary leading-relaxed ${hasError ? 'text-crimson' : ''}`}>
            <ReactMarkdown>{content}</ReactMarkdown>
          </div>
        )}

        {isStreaming && content && (
          <span className="inline-block w-2 h-5 bg-gold animate-pulse ml-1" />
        )}
      </div>

      {/* Footer note */}
      {isDone && !hasError && content && (
        <div className="mt-6 pt-4 border-t border-border">
          <p className="text-sm text-text-secondary text-center">
            This hardened version addresses critiques from all four adversarial agents.
            Use it as a starting point to strengthen your idea further.
          </p>
        </div>
      )}
    </div>
  )
}

export default SynthesisPanel
