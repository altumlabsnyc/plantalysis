import classNames from 'classnames'

/**
 * Props for the PasswordStrengthMeter component.
 */
interface Props {
  /**
 * The strength of the password.
 * - '' (empty string) indicates no strength is set.
 * - 'Too weak' indicates the password is very weak.
 * - 'Weak' indicates the password is weak.
 * - 'Medium' indicates the password has medium strength.
 * - 'Strong' indicates the password is strong.
 */
  strength: '' | 'Too weak' | 'Weak' | 'Medium' | 'Strong'
}

/**
 * PasswordStrengthMeter component.
 * 
 * This component displays a visual representation of password strength using three bars.
 * The bars change color based on the strength of the password.
 * 
 * @param {Props} props - The properties of the component.
 * @returns {JSX.Element | null} The rendered component or null if no strength is set.
 */
export default function PasswordStrengthMeter({ strength }: Props) {

  if (strength === '') return null

  // div with three bars that change color based on strength, styled in TailwindCSS
  return (
    <div className="flex items-center justify-center">
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
