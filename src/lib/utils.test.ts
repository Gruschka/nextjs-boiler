import { describe, it, expect } from 'vitest'
import { cn } from './utils'

describe('cn', () => {
  it('merges class names', () => expect(cn('foo', 'bar')).toBe('foo bar'))
  it('handles falsy conditionals', () => expect(cn('foo', false && 'bar')).toBe('foo'))
  it('handles undefined and null', () => expect(cn('foo', undefined, null)).toBe('foo'))
  it('deduplicates conflicting Tailwind classes (last wins)', () =>
    expect(cn('px-2', 'px-4')).toBe('px-4'))
  it('deduplicates across groups', () =>
    expect(cn('text-sm font-bold', 'text-lg')).toBe('font-bold text-lg'))
})
