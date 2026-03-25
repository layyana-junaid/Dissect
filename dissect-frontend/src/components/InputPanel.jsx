import { useState, useRef, useCallback } from 'react'

function InputPanel({ onAnalyze, isAnalyzing, onReset, hasStarted, allDone }) {
  const [idea, setIdea] = useState('')
  const [file, setFile] = useState(null)
  const [dragActive, setDragActive] = useState(false)
  const fileInputRef = useRef(null)

  const handleDrag = useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0]
      const validTypes = [
        'application/pdf',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      ]
      if (validTypes.includes(droppedFile.type) ||
          droppedFile.name.endsWith('.pdf') ||
          droppedFile.name.endsWith('.docx')) {
        setFile(droppedFile)
      } else {
        alert('Please upload a PDF or DOCX file.')
      }
    }
  }, [])

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  const handleRemoveFile = () => {
    setFile(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!idea.trim() && !file) {
      alert('Please enter an idea or upload a document.')
      return
    }
    onAnalyze(idea, file)
  }

  const handleResetClick = () => {
    setIdea('')
    setFile(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
    onReset()
  }

  return (
    <section className="card max-w-3xl mx-auto">
      <form onSubmit={handleSubmit}>
        <label htmlFor="idea-input" className="block font-display text-xl font-semibold text-text-primary mb-4">
          What's your idea?
        </label>

        <textarea
          id="idea-input"
          className="input-field min-h-[160px] resize-y font-body"
          placeholder="Describe your idea in detail... What problem does it solve? Who is it for? How does it work?"
          value={idea}
          onChange={(e) => setIdea(e.target.value)}
          disabled={isAnalyzing}
        />

        {/* File Upload Zone */}
        <div
          className={`mt-4 border-2 border-dashed rounded-card p-6 text-center transition-colors ${
            dragActive
              ? 'border-crimson bg-crimson/5'
              : 'border-border hover:border-crimson/50'
          } ${isAnalyzing ? 'opacity-50 pointer-events-none' : ''}`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          {file ? (
            <div className="flex items-center justify-center gap-3">
              <svg className="w-6 h-6 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span className="text-text-primary font-medium">{file.name}</span>
              <button
                type="button"
                onClick={handleRemoveFile}
                className="ml-2 text-crimson hover:text-crimson-dark transition-colors"
                disabled={isAnalyzing}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ) : (
            <div>
              <p className="text-text-secondary mb-2">
                Drag & drop a PDF or DOCX file here, or{' '}
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="text-crimson hover:text-crimson-dark underline"
                >
                  browse
                </button>
              </p>
              <p className="text-text-secondary text-sm opacity-70">
                Optional: supplement your idea with a document
              </p>
            </div>
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.docx"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>

        {/* Buttons */}
        <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
          <button
            type="submit"
            disabled={isAnalyzing || (!idea.trim() && !file)}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isAnalyzing ? (
              <>
                <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Dissecting...
              </>
            ) : (
              'Dissect It'
            )}
          </button>

          {hasStarted && allDone && (
            <button
              type="button"
              onClick={handleResetClick}
              className="px-8 py-3 rounded-card border-2 border-border text-text-primary font-semibold hover:bg-white hover:border-crimson/50 transition-all"
            >
              ↺ Start Over
            </button>
          )}
        </div>
      </form>
    </section>
  )
}

export default InputPanel
