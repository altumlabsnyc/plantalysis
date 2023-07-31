import classNames from 'classnames'

interface Props {
  strength: '' | 'Too weak' | 'Weak' | 'Medium' | 'Strong'
}

export default function PasswordStrengthMeter({ strength }: Props) {
  console.log(strength)
  if (strength === '') return null

  // div with three bars that change color based on strength, styled in TailwindCSS
  return (
    <div className="flex items-center justify-center">
      {/* <Typography variant="body2" color="gray">
        Strength: {strength}
      </Typography> */}
      <div className="flex mt-1 mb-2 h-2 justify-between w-64 transition-all mx-auto rounded-xl">
        <div
          className={classNames(
            { 'bg-red-500': strength === 'Too weak' },
            { 'bg-yellow-400': strength === 'Weak' || strength === 'Medium' },
            { 'bg-green-400': strength === 'Strong' },
            'w-1/3 mx-1 rounded-full',
          )}
        ></div>
        <div
          className={classNames(
            { 'bg-yellow-400': strength === 'Weak' || strength === 'Medium' },
            { 'bg-green-400': strength === 'Strong' },
            'w-1/3 mx-1 rounded-full',
          )}
        ></div>
        <div
          className={classNames(
            { 'bg-green-400': strength === 'Strong' },
            'w-1/3 mx-1 rounded-full',
          )}
        ></div>
      </div>
    </div>
  )
}
