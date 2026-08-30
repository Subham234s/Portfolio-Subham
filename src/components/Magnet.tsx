import React, { useRef, useCallback } from 'react'

interface MagnetProps {
  children: React.ReactNode
  padding?: number
  strength?: number
  activeTransition?: string
  inactiveTransition?: string
  className?: string
}

const Magnet: React.FC<MagnetProps> = ({
  children,
  padding = 150,
  strength = 3,
  activeTransition = 'transform 0.3s ease-out',
  inactiveTransition = 'transform 0.6s ease-in-out',
  className = '',
}) => {
  const elementRef = useRef<HTMLDivElement>(null)
  const isActive = useRef(false)

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!elementRef.current) return
      const rect = elementRef.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const distX = e.clientX - centerX
      const distY = e.clientY - centerY
      const absDistX = Math.abs(e.clientX - rect.left)
      const absDistY = Math.abs(e.clientY - rect.top)
      const withinX = e.clientX >= rect.left - padding && e.clientX <= rect.right + padding
      const withinY = e.clientY >= rect.top - padding && e.clientY <= rect.bottom + padding

      if (withinX && withinY) {
        if (!isActive.current) {
          isActive.current = true
          elementRef.current.style.transition = activeTransition
        }
        elementRef.current.style.transform = `translate3d(${distX / strength}px, ${distY / strength}px, 0)`
        elementRef.current.style.willChange = 'transform'
      } else {
        if (isActive.current) {
          isActive.current = false
          elementRef.current.style.transition = inactiveTransition
          elementRef.current.style.transform = 'translate3d(0, 0, 0)'
        }
      }
    },
    [padding, strength, activeTransition, inactiveTransition]
  )

  const handleMouseLeave = useCallback(() => {
    if (!elementRef.current) return
    isActive.current = false
    elementRef.current.style.transition = inactiveTransition
    elementRef.current.style.transform = 'translate3d(0, 0, 0)'
  }, [inactiveTransition])

  React.useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [handleMouseMove])

  return (
    <div ref={elementRef} className={className} onMouseLeave={handleMouseLeave}>
      {children}
    </div>
  )
}

export default Magnet
