'use client'

import { useUIStore } from '@/stores/ui'

export function SidebarToggle() {
  const toggleSidebar = useUIStore((s) => s.toggleSidebar)

  return (
    <button
      onClick={toggleSidebar}
      className="rounded p-1.5 text-fg-2 hover:text-fg"
      aria-label="Open sidebar"
    >
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M2 4h14M2 9h14M2 14h14" strokeLinecap="round" />
      </svg>
    </button>
  )
}
