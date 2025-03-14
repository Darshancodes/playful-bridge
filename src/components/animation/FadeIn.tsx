
import { motion } from 'framer-motion';
import { PropsWithChildren } from 'react';

interface FadeInProps extends PropsWithChildren {
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  duration?: number;
  className?: string;
}

const FadeIn = ({
  children,
  delay = 0,
  direction = 'up',
  duration = 0.5,
  className = '',
}: FadeInProps) => {
  let initial = { opacity: 0 };
  
  if (direction === 'up') {
    initial = { ...initial, y: 30 };
  } else if (direction === 'down') {
    initial = { ...initial, y: -30 };
  } else if (direction === 'left') {
    initial = { ...initial, x: 30 };
  } else if (direction === 'right') {
    initial = { ...initial, x: -30 };
  }

  return (
    <motion.div
      initial={initial}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default FadeIn;
