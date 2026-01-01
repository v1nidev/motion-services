import React, { useRef, useState } from 'react'

export interface CopyableProps {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
}

export function Copyable({ children, className, style }: CopyableProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isCopied, setIsCopied] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleCopy = async () => {
    if (!containerRef.current) return

    // Extract text content from children
    const textContent = containerRef.current.textContent || ''

    try {
      await navigator.clipboard.writeText(textContent)
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy text:', err)
    }
  }

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        ...style,
        display: style?.display?.includes('flex') ? style.display : 'inline-flex',
        alignItems: 'center',
        gap: '0.5rem',
        cursor: 'pointer',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleCopy}
    >
      {children}
      {isHovered && (
        <span
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            color: 'black',
          }}
          aria-label={isCopied ? 'Copied!' : 'Copy to clipboard'}
        >
          {isCopied ? (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M13.5 4L6 11.5L2.5 8"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M5.5 4.5H3.5C2.94772 4.5 2.5 4.94772 2.5 5.5V12.5C2.5 13.0523 2.94772 13.5 3.5 13.5H10.5C11.0523 13.5 11.5 13.0523 11.5 12.5V10.5M5.5 4.5C5.5 3.94772 5.94772 3.5 6.5 3.5H12.5C13.0523 3.5 13.5 3.94772 13.5 4.5V10.5C13.5 11.0523 13.0523 11.5 12.5 11.5H6.5C5.94772 11.5 5.5 11.0523 5.5 10.5V4.5Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </span>
      )}
    </div>
  )
}
