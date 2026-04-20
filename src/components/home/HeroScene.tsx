'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { motion, useReducedMotion, useScroll, useTransform, type Variants } from 'framer-motion'

const easeOutQuint = [0.22, 1, 0.36, 1] as const

const copyAnimation: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      delay: 0.15 + index * 0.12,
      ease: easeOutQuint,
    },
  }),
}

export function HeroScene() {
  const prefersReducedMotion = useReducedMotion()
  const { scrollYProgress } = useScroll()

  const imageY = useTransform(scrollYProgress, [0, 0.35], ['0%', '8%'])
  const imageScale = useTransform(scrollYProgress, [0, 0.35], [1.02, 1.08])
  const glowY = useTransform(scrollYProgress, [0, 0.35], ['0%', '12%'])
  const copyY = useTransform(scrollYProgress, [0, 0.35], ['0%', '16%'])

  return (
    <section className="relative min-h-[100svh] overflow-hidden pt-22">
      <div className="absolute inset-0">
        <motion.div
          data-testid="hero-layer"
          className="absolute inset-0"
          style={{ y: imageY, scale: prefersReducedMotion ? 1 : imageScale }}
        >
          <Image
            src="/hero/hero-base.jpg"
            alt="Спальня с домашним текстилем"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </motion.div>

        <motion.div
          data-testid="hero-layer"
          className="absolute inset-0"
          style={{ y: glowY }}
          animate={prefersReducedMotion ? undefined : { opacity: [0.72, 0.9, 0.72] }}
          transition={prefersReducedMotion ? undefined : { duration: 7, ease: 'easeInOut', repeat: Number.POSITIVE_INFINITY }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_24%,rgba(255,245,226,0.42),transparent_26%),radial-gradient(circle_at_14%_30%,rgba(255,252,242,0.16),transparent_22%)]" />
        </motion.div>

        <div className="hero-overlay absolute inset-0" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(12,10,8,0.08),rgba(12,10,8,0.42))]" />
        <div className="absolute inset-y-0 left-0 w-[56%] bg-[linear-gradient(90deg,rgba(17,17,18,0.42),rgba(17,17,18,0.14),transparent)]" />
      </div>

      <motion.div className="container-wide relative flex min-h-[calc(100svh-5.5rem)] items-end py-10 md:py-16" style={{ y: copyY }}>
        <div className="max-w-2xl space-y-6 text-white">
          <motion.span custom={0} initial="hidden" animate="visible" variants={copyAnimation} className="eyebrow !text-white/78">
            Хлопковый Край 96 • Екатеринбург
          </motion.span>
          <motion.h1
            custom={1}
            initial="hidden"
            animate="visible"
            variants={copyAnimation}
            className="font-serif-display text-5xl leading-[0.92] md:text-7xl"
          >
            Домашний текстиль для спокойного и собранного дома
          </motion.h1>
          <motion.p
            custom={2}
            initial="hidden"
            animate="visible"
            variants={copyAnimation}
            className="max-w-xl text-base leading-7 text-white/86 md:text-lg"
          >
            Подбираем постельное белье, подушки, пледы и халаты без лишнего шума:
            с понятной консультацией, подтверждением наличия и реальным магазином на Викулова.
          </motion.p>
          <motion.div
            custom={3}
            initial="hidden"
            animate="visible"
            variants={copyAnimation}
            className="flex flex-col gap-3 sm:flex-row"
          >
            <Link href="/catalog" className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-[var(--foreground)]">
              Перейти в каталог
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/cart" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/35 bg-white/10 px-6 py-3 text-sm font-medium text-white backdrop-blur-sm">
              Оставить заявку
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
