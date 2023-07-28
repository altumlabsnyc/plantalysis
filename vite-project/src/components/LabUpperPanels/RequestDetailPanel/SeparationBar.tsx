interface SeparationBarProps {
  height?: string
  width?: string
  horizontal?: boolean
}
export default function SeparationBar({
  height,
  width,
  horizontal,
}: SeparationBarProps) {
  return (
    <div
      style={{
        height: height ? height : horizontal ? '2px' : '20px',
        width: width ? width : horizontal ? '100%' : '2px',
        backgroundColor: '#D0D5DD',
        margin: horizontal ? '5px 0' : '0',
      }}
    />
  )
}
