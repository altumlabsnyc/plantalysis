export type HeaderIcon = {
  icon: string
  onClick: (...args: any[]) => void
}

export type HeaderLink = {
  label: string
  onClick: (...args: any[]) => void
}

export type SidebarItem = {
  icon?: React.ReactNode
  text: string
  onClick: (...args: any[]) => void
}

export interface SidebarSection {
  title: string
  items: SidebarItem[]
}
