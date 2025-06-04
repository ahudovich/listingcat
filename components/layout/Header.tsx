import Link from 'next/link'
import BaseButton from '@/components/ui/BaseButton'
import BaseLogo from '@/components/ui/BaseLogo'
import { APP_REDIRECT_URL } from '@/enums/constants'

export default function Header({ isLoggedIn }: { isLoggedIn: boolean }) {
  return (
    <header className="mx-auto px-4 max-w-6xl">
      <div className="flex items-center justify-between h-18">
        <Link className="py-3" href="/">
          <BaseLogo className="w-35.5 h-5.5" />
        </Link>

        <div className="flex items-center gap-2 sm:gap-4">
          {!isLoggedIn ? (
            <>
              <BaseButton variant="ghost" size="sm" asChild>
                <Link href="/login">Log in</Link>
              </BaseButton>

              <BaseButton size="sm" asChild>
                <Link href="/create-account">
                  <span className="hidden sm:inline">Create account</span>
                  <span className="inline sm:hidden">Sign up</span>
                </Link>
              </BaseButton>
            </>
          ) : (
            <BaseButton size="sm" asChild>
              <Link href={APP_REDIRECT_URL}>Dashboard</Link>
            </BaseButton>
          )}
        </div>
      </div>
    </header>
  )
}
