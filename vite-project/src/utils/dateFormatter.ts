const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
]

export default function formatDate(str: string) {
  const date = new Date(str)
  const year = date.getFullYear()
  const month = months[date.getMonth()]
  const dateVal = date.getDate()
  return month + ' ' + dateVal + ', ' + year
}
