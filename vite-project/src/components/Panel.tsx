interface PanelProps {
  children: React.ReactNode
}

export default function Panel({ children }: PanelProps) {
  return (
    <div
      style={{
        borderRadius: '10px',
        backgroundColor: 'white',
        padding: '4px 10px',
      }}
    >
      {children}
    </div>
  )
}
