interface PanelProps {
    children: React.ReactNode;
}

export default function Panel({ children }: PanelProps) {
    return (
        <div style={{
            borderRadius: '10px',
            backgroundColor: 'white'
        }}>
            {children}
        </div>
    )
}