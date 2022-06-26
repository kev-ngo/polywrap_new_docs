import { ButtonLink } from '@/components/Button'

export function Hero() {
  return (
    <div className="overflow-hidden bg-slate-900 dark:-mb-32 dark:-mt-[4.5rem] dark:pb-32 dark:pt-[4.5rem] dark:lg:-mt-[4.75rem] dark:lg:pt-[4.75rem]">
      <div className="flex items-center py-16 sm:px-2 lg:relative lg:py-36 lg:px-0">
        <div className="mx-auto max-w-2xl grid-cols-1  px-4  lg:max-w-8xl lg:grid-cols-2 lg:px-8 xl:gap-x-16 xl:px-12">
          <div className="relative z-10 md:text-center lg:text-center">
            <div className="relative">
              <p className="inline bg-gradient-to-r from-emerald-500 to-cyan-400  bg-clip-text font-display text-5xl tracking-tight text-transparent">
                Supercharged, Decentralized SDKs
              </p>
              <p className="mt-3 text-2xl tracking-tight text-slate-300">
                Polywrap is the modern, open-source toolchain for developing
                cross-platform software
              </p>
              <div className="mt-8 flex space-x-4 md:justify-center lg:justify-center">
                <ButtonLink href="/second">Get started</ButtonLink>
                <ButtonLink href="/" variant="secondary">
                  View on GitHub
                </ButtonLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
