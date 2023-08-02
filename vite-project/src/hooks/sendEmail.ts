export async function sendMail(text: string) {
  console.log('checkpoint 1')
  // send mail with defined transport object
  const response: Response = await fetch(
    `${import.meta.env.VITE_BACKEND_DOMAIN}/send-email`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text }),
    },
  )
}
