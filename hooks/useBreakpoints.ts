import { useMedia } from 'react-use'

export function useBreakpointXs() {
  const isBreakpointXs = useMedia('(min-width: 30rem)', false)
  return isBreakpointXs
}

export function useBreakpointSm() {
  const isBreakpointSm = useMedia('(min-width: 40rem)', false)
  return isBreakpointSm
}

export function useBreakpointMd() {
  const isBreakpointMd = useMedia('(min-width: 48rem)', false)
  return isBreakpointMd
}

export function useBreakpointLg() {
  const isBreakpointLg = useMedia('(min-width: 64rem)', false)
  return isBreakpointLg
}

export function useBreakpointXl() {
  const isBreakpointXl = useMedia('(min-width: 80rem)', false)
  return isBreakpointXl
}

export function useBreakpoint2xl() {
  const isBreakpoint2xl = useMedia('(min-width: 96rem)', false)
  return isBreakpoint2xl
}
