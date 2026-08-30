import React from 'react'

interface LiveProjectButtonProps {
  className?: string
}

const LiveProjectButton: React.FC<LiveProjectButtonProps> = ({ className = '' }) => {
  return (
    <button
      id="live-project-btn"
      className={`rounded-full border-2 border-[#D7E2EA] text-[#D7E2EA] font-medium uppercase tracking-widest
        px-8 py-3 text-sm
        sm:px-10 sm:py-3.5 sm:text-base
        transition-colors duration-200 hover:bg-[#D7E2EA]/10 cursor-pointer
        ${className}`}
    >
      Live Project
    </button>
  )
}

export default LiveProjectButton
