import React from 'react'
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion'

interface AnimatedTextProps {
  text: string
  className?: string
  style?: React.CSSProperties
}

const AnimatedChar: React.FC<{
  char: string
  scrollYProgress: MotionValue<number>
  index: number
  total: number
}> = ({ char, scrollYProgress, index, total }) => {
  const start = index / total
  const end = Math.min((index + 1) / total + 0.05, 1)
  const opacity = useTransform(scrollYProgress, [start, end], [0.2, 1])

  if (char === ' ') {
    return <span className="inline-block">&nbsp;</span>
  }

  return (
    <span className="relative inline-block">
      <span className="invisible">{char}</span>
      <motion.span className="absolute inset-0" style={{ opacity }}>
        {char}
      </motion.span>
    </span>
  )
}

const AnimatedText: React.FC<AnimatedTextProps> = ({ text, className = '', style }) => {
  const ref = React.useRef<HTMLParagraphElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.8', 'end 0.2'],
  })

  const chars = text.split('')

  return (
    <p ref={ref} className={className} style={style}>
      {chars.map((char, i) => (
        <AnimatedChar
          key={i}
          char={char}
          scrollYProgress={scrollYProgress}
          index={i}
          total={chars.length}
        />
      ))}
    </p>
  )
}

export default AnimatedText
