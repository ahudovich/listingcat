import { useMedia } from 'react-use'

export function useBreakpointXs(initialValue: boolean) {
  const isBreakpointXs = useMedia('(min-width: 30rem)', initialValue)
  return isBreakpointXs
}

export function useBreakpointSm(initialValue: boolean) {
  const isBreakpointSm = useMedia('(min-width: 40rem)', initialValue)
  return isBreakpointSm
}

export function useBreakpointMd(initialValue: boolean) {
  const isBreakpointMd = useMedia('(min-width: 48rem)', initialValue)
  return isBreakpointMd
}

export function useBreakpointLg(initialValue: boolean) {
  const isBreakpointLg = useMedia('(min-width: 64rem)', initialValue)
  return isBreakpointLg
}

export function useBreakpointXl(initialValue: boolean) {
  const isBreakpointXl = useMedia('(min-width: 80rem)', initialValue)
  return isBreakpointXl
}

export function useBreakpoint2xl(initialValue: boolean) {
  const isBreakpoint2xl = useMedia('(min-width: 96rem)', initialValue)
  return isBreakpoint2xl
}
