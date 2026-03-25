import ReactMarkdown from 'react-markdown'

const AgentIcons = {
  technical_skeptic: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  market_critic: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  ),
  ethics_advocate: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
    </svg>
  ),
  lazy_user: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  ),
}

function AgentCard({
  agentId,
  name,
  tagline,
  colorClass,
  content,
  isStreaming,
  isDone,
  hasError,
  delay = 0,
}) {
  return (
    <div
      className={`card border-l-4 ${colorClass} animate-fade-in-up`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="text-text-secondary">
            {AgentIcons[agentId]}
          </div>
          <div>
            <h3 className="font-display text-lg font-semibold text-text-primary">
              {name}
            </h3>
            <p className="text-sm text-text-secondary">{tagline}</p>
          </div>
        </div>

        {/* Status Indicator */}
        <div className="flex items-center gap-2">
          {isStreaming && (
            <div className="flex items-center gap-1.5">
              <span className="streaming-dot" />
              <span className="text-xs text-crimson font-medium">Live</span>
            </div>
          )}
          {isDone && !hasError && (
            <span className="text-forest-green text-sm font-medium">Done</span>
          )}
          {hasError && (
            <span className="text-crimson text-sm font-medium">Error</span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="min-h-[120px] max-h-[400px] overflow-y-auto">
        {!content && isStreaming && (
          <div className="space-y-3">
            <div className="skeleton h-4 w-full" />
            <div className="skeleton h-4 w-5/6" />
            <div className="skeleton h-4 w-4/6" />
            <div className="skeleton h-4 w-full" />
            <div className="skeleton h-4 w-3/4" />
          </div>
        )}

        {content && (
          <div className={`prose prose-sm max-w-none text-text-primary leading-relaxed ${hasError ? 'text-crimson' : ''}`}>
            <ReactMarkdown>{content}</ReactMarkdown>
          </div>
        )}

        {isStreaming && content && (
          <span className="inline-block w-2 h-4 bg-crimson animate-pulse ml-1" />
        )}
      </div>
    </div>
  )
}

export default AgentCard
