interface PanelProps {
  children: React.ReactNode
}

export default function Panel({ children }: PanelProps) {
  return (
    <div className="py-2 px-3 rounded-lg shadow-xl bg-white">{children}</div>
  )
}
