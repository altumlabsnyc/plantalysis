import { generalInputs, users } from '@/constants/formInputs'
import {
  getLabSignupInfoFromForm,
  getProducerSignUpInfoFromForm,
  getRegulatorSignupInfoFromForm,
  getUniversitySignUpInfoFromForm,
} from '@/helpers/registerHelpers'
import { AllRolesData, handleSignUp } from '@/hooks/handleSignUp'
import { BaseUser, LicenseType, UserRole } from '@/types/supabaseAlias'
import isValidEmail from '@/utils/isValidEmail'
import toE164 from '@/utils/toE164'
import {
  Box,
  Button,
  CssBaseline,
  FormControlLabel,
  Grid,
  Link,
  Paper,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@mui/material'
import { passwordStrength as checkPasswordStrength } from 'check-password-strength'
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { Toaster, toast } from 'react-hot-toast'
import { useHistory } from 'react-router-dom'
import backgroundImage from '@/components/assets/img/hero.png'
import logo from '@/components/assets/img/plantalysis.png'
import Spinner from '@/components/common/Spinner'
import PasswordStrengthMeter from '@/utils/PasswordStrengthMeter'

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {'Copyright © '}
      <Link color="inherit" href="https://altumlabs.co/">
        PLANTALYSIS
      </Link>{' '}
      by Altum Labs.
    </Typography>
  )
}

export default function Register() {
  const history = useHistory()
  const [loading, setLoading] = useState(false)

  // producer
  const [licenseType, setLicenseType] = useState<LicenseType | null>(null)
  const [licensePrefix, setLicensePrefix] = useState<string | null>(null)
  const [licenseNumber, setLicenseNumber] = useState<string | null>(null)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)

    // populate general Inputs:
    if (currentTab == 1) {
      const mayProceed = handleGeneralInputsSubmit(data)
      console.log(mayProceed)
      if (!mayProceed) return
    }

    //populate additional inputs and submit all
    if (currentTab == 2) {
      await handleAdditionalInputsSubmit(data)
    }

    //pass to next tab if not done
    if (
      selectedUser !== undefined &&
      (currentTab == 0 || (currentTab == 1 && selectedUser != 'consumer'))
    ) {
      setCurrentTab(currentTab + 1)
    }
  }

  //Filling out user data

  function handleGeneralInputsSubmit(data: FormData) {
    const firstName = data.get('firstName')?.toString() || null
    const lastName = data.get('lastName')?.toString() || null
    const email = data.get('email')?.toString() || null
    let phone = data.get('phone')?.toString() || null
    const pass = password

    // if any null, return appropriate toast.error
    if (
      firstName == null ||
      lastName == null ||
      email == null ||
      phone == null ||
      !pass ||
      !confirmPassword
    ) {
      toast.error('Please fill out all fields')
      return false
    }

    // if email is invalid, return appropriate toast.error
    if (!isValidEmail(email)) {
      toast.error('Please enter a valid email')
      return false
    }

    if (passwordStrength === 'Too weak') {
      toast.error('Please enter a stronger password')
      return false
    }

    // if passwords don't match, return appropriate toast.error
    if (pass !== confirmPassword) {
      toast.error('Passwords do not match')
      return false
    }

    try {
      phone = toE164(phone)
    } catch (error) {
      toast.error('Please enter a valid phone number. Enter numbers only.')
      return false
    }

    const newGeneralUserData = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      mfa_phone: phone,
      user_type: selectedUser ? selectedUser : null,
      id: '',
    }

    setGeneralUserData(newGeneralUserData)

    // do signup straight ahead if this is the base user case
    if (selectedUser == 'consumer' && pass !== undefined) {
      const roleData: AllRolesData = {
        consumerData: { id: '', personality: null },
      }
      handleSignUp(history, {
        userDetails: newGeneralUserData,
        roleData: roleData,
        password: pass,
      })
    }

    return true
  }

  async function handleAdditionalInputsSubmit(data: FormData) {
    setLoading(true)

    if (generalUserData) {
      switch (selectedUser) {
        case 'producer':
          const prodData = getProducerSignUpInfoFromForm(
            data,
            `OCM-${licenseType}-${licensePrefix}-${licenseNumber}`,
          )
          if (prodData) {
            await handleSignUp(history, {
              userDetails: generalUserData,
              roleData: { producerData: prodData },
              password: password,
            })
          }
          break
        case 'university':
          const universityData = getUniversitySignUpInfoFromForm(data)
          if (universityData) {
            await handleSignUp(history, {
              userDetails: generalUserData,
              roleData: { universityData: universityData },
              password: password,
            })
          }
          break
        case 'lab':
          const labData = getLabSignupInfoFromForm(data)
          if (labData) {
            await handleSignUp(history, {
              userDetails: generalUserData,
              roleData: { labData },
              password: password,
            })
          }
          break
        case 'regulator':
          const regulatorData = getRegulatorSignupInfoFromForm(data)
          if (regulatorData) {
            await handleSignUp(history, {
              userDetails: generalUserData,
              roleData: { regulatorData },
              password: password,
            })
          }
          break
      }
    }

    setLoading(false)
  }

  const handleSelectingUser = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedUser(event.target.value as UserRole)
  }

  //useState variable declaration
  const [selectedUser, setSelectedUser] = useState<UserRole>()
  const [currentTab, setCurrentTab] = useState(0)
  const [generalUserData, setGeneralUserData] = useState<BaseUser>()
  const [password, setPassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('')
  const [passwordStrength, setPasswordStrength] = useState<
    '' | 'Too weak' | 'Weak' | 'Medium' | 'Strong'
  >('')

  const handlePasswordChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setPassword(e.target.value)

    if (e.target.value === '') {
      setConfirmPassword('')
      setPasswordStrength('')
    } else {
      // @ts-ignore
      setPasswordStrength(checkPasswordStrength(e.target.value).value)
    }
  }

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const role = params.get('role')

    if (
      (role && role === 'producer') ||
      role === 'university' ||
      role === 'lab' ||
      role === 'regulator'
    ) {
      setSelectedUser(role)
      setCurrentTab(1)
    }
  }, [])

  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
      <Toaster />
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          position: 'relative',
        }}
      >
        {/* <video
          autoPlay
          loop
          muted
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        >
          <source src={backgroundVideo} type="video/mp4" />
        </video> */}
        <img
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
          src={backgroundImage}
        />

        <Typography
          component="h1"
          variant="h3"
          sx={{
            position: 'absolute',
            top: '35%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            color: 'white',
            fontWeight: 'bold',
            textShadow: '2px 2px 16px rgba(0, 0, 0, 1)',
          }}
        >
          PLANTALYSIS
        </Typography>

        <a href="https://www.plantalysis.com">
          <img
            src={logo}
            alt="Logo"
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '150px',
              height: '150px',
              borderRadius: '75%',
              marginTop: '20px',
            }}
          />
        </a>
        <a href="https://www.plantalysis.com">
          <img
            src={logo}
            alt="Logo"
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '150px',
              height: '150px',
              borderRadius: '75%',
              marginTop: '20px',
            }}
          />
        </a>
        <a href="https://www.plantalysis.com">
          <img
            src={logo}
            alt="Logo"
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '150px',
              height: '150px',
              borderRadius: '75%',
              marginTop: '20px',
            }}
          />
        </a>
        <Typography
          component="h1"
          variant="h3"
          sx={{
            position: 'absolute',
            top: '70%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            color: 'white',
            fontWeight: 'bold',
            textShadow: '2px 2px 16px rgba(0, 0, 0, 1)',
          }}
        >
          Join Us
        </Typography>
      </Grid>
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {currentTab == 0 && (
            <Typography component="h1" variant="h4">
              <span className="font-semibold">Who are you?</span>
            </Typography>
          )}
          {/* {currentTab == 1 && (
            <div>
              <Typography component="h1" variant="h5">
                Create an account
              </Typography>
              <Typography component="h1" variant="body2">
                Already have an account?{' '}
                <a href="/login" id="showLoginFormLink">
                  Log in
                </a>
              </Typography>
            </div>
          )} */}
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 1 }}
            className="flex flex-col items-center justify-center"
          >
            {currentTab == 0 && (
              <RadioGroup
                value={selectedUser}
                onChange={handleSelectingUser}
                sx={{
                  alignItems: 'left',
                }}
              >
                {users.map((user) => (
                  <Box
                    key={user.name}
                    display="flex"
                    alignItems="left"
                    sx={{
                      my: 1,
                      mx: 4,
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'left',
                    }}
                  >
                    <FormControlLabel
                      key={user.name}
                      value={user.userType}
                      control={<Radio style={{ display: 'none' }} />} // hide the radio button
                      labelPlacement="end"
                      sx={{
                        my: 0.5,
                        mx: 2,
                        display: 'flex',
                        borderRadius: '10px',
                        flexDirection: 'row',
                        alignItems: 'center',
                        boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .3)', // Add a shadow
                        backgroundColor:
                          selectedUser === user.userType
                            ? 'lightgrey'
                            : 'transparent', // Change background color if selected
                        '&:hover': {
                          backgroundColor: 'lightgrey',
                        },
                        'transition-property': 'all',
                        'transition-timing-function':
                          'cubic-bezier(0.4, 0, 0.2, 1)',
                        'transition-duration': '150ms',
                      }}
                      className="transition-all"
                      label={
                        <Box
                          sx={{
                            mx: 2,
                            my: 2,
                            flexDirection: 'row',
                            borderRadius: '20px',
                            display: 'flex',
                            alignItems: 'center',
                          }}
                        >
                          <img
                            src={`./src/components/assets/svg/${user.code}.svg`}
                            alt={user.code}
                            style={{ height: '8%', width: '8%' }}
                            className="h-6 w-6"
                          />
                          <span className="ml-4">
                            {
                              <Typography component="p" variant="h6">
                                <span className="font-semibold">
                                  {user.name}
                                </span>
                              </Typography>
                            }
                          </span>
                        </Box>
                      }
                    />
                  </Box>
                ))}
              </RadioGroup>
            )}

            {currentTab == 1 && (
              <div>
                <Typography variant="h5">
                  <span className="font-semibold">
                    Register as a{' '}
                    {(selectedUser &&
                      selectedUser.charAt(0).toUpperCase() +
                        selectedUser.slice(1)) ||
                      'FATAL ERROR: CONTACT ALTUM LABS'}
                    .
                  </span>
                </Typography>
                <p className="text-gray-600">
                  First, enter some basic information.
                </p>
                {generalInputs.map((input) => (
                  <>
                    <TextField
                      key={input.id}
                      margin="normal"
                      required
                      fullWidth
                      id={input.id}
                      type={input.type}
                      label={input.name}
                      name={input.id}
                      autoComplete={`Enter your ${input.name.toLowerCase()}`}
                      autoFocus
                      inputProps={{
                        className: 'focus:outline-none focus:ring-0',
                      }}
                      onChange={(e) => {
                        if (input.id === 'password') {
                          handlePasswordChange(e)
                        } else if (input.id === 'confirm_password') {
                          setConfirmPassword(e.target.value)
                        }
                      }}
                    />
                    {input.id === 'confirm_password' && (
                      <PasswordStrengthMeter strength={passwordStrength} />
                    )}
                    {input.id === 'confirm_password' &&
                      password !== confirmPassword && (
                        <Typography variant="body2" color="error">
                          Passwords do not match
                        </Typography>
                      )}
                  </>
                ))}
              </div>
            )}
            {currentTab == 2 && (
              <div>
                <Typography variant="h5">
                  <span className="font-semibold">Finish Sign Up</span>
                </Typography>
                <p className="text-gray-600">
                  Enter some final details to finish signing up as a{' '}
                  {selectedUser || 'FATAL ERROR: CONTACT ALTUM LABS'}.{' '}
                  {(selectedUser === 'lab' || selectedUser === 'producer') &&
                    'If you have multiple facilities, please enter the information for your main facility.'}
                </p>
                {users
                  .filter((user) => selectedUser === user.userType)
                  .map((user) => (
                    <div key={user.name}>
                      {user.inputs?.map((input) => {
                        if (input.id === 'license_type') {
                          return (
                            <div
                              className="border-t-2 mt-2 pt-2"
                              key={input.id}
                            >
                              <Typography variant="subtitle1">
                                License Information
                              </Typography>
                              <RadioGroup
                                name="license_type"
                                sx={{
                                  display: 'flex',
                                  flexDirection: 'row',
                                  justifyContent: 'center',
                                }}
                                onChange={(e) => {
                                  const licenseType = e.target
                                    .value as LicenseType
                                  if (
                                    licenseType === 'AUCC' ||
                                    licenseType === 'AUCP' ||
                                    licenseType === 'AUHC'
                                  ) {
                                    setLicenseType(licenseType)
                                  } else {
                                    toast.error('Invalid license type')
                                  }
                                }}
                              >
                                <FormControlLabel
                                  control={<Radio />}
                                  label="AUCC"
                                  value="AUCC"
                                />
                                <FormControlLabel
                                  control={<Radio />}
                                  label="AUCP"
                                  value="AUCP"
                                />
                                <FormControlLabel
                                  control={<Radio />}
                                  label="AUHC"
                                  value="AUHC"
                                />
                              </RadioGroup>
                            </div>
                          )
                        }
                        // Render other text fields except "license_type"
                        if (input.id !== 'license_type') {
                          return (
                            <TextField
                              key={input.id}
                              margin="normal"
                              required
                              fullWidth
                              id={input.id}
                              label={input.name}
                              name={input.id}
                              autoComplete={`Enter your ${input.name.toLowerCase()}`}
                              autoFocus
                              inputProps={{
                                className: 'focus:outline-none focus:ring-0',
                              }}
                              onChange={(e) => {
                                if (input.id === 'license_prefix') {
                                  setLicensePrefix(e.target.value)
                                } else if (input.id === 'license_number') {
                                  setLicenseNumber(e.target.value)
                                }
                              }}
                              {...input.props}
                            />
                          )
                        }
                        // Render "license_number" text field after "license_type"
                        return null
                      })}
                    </div>
                  ))}
                {selectedUser === 'producer' &&
                  licenseType &&
                  licensePrefix &&
                  licenseNumber && (
                    <>
                      <p className="text-center">
                        Please confirm your license number before continuing{' '}
                      </p>
                      <p className="text-center font-semibold underline">
                        OCM-{licenseType}-{licensePrefix}-{licenseNumber}
                      </p>
                    </>
                  )}
              </div>
            )}
            <Button
              type="submit"
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                mx: 'auto', // Add this line
                display: 'block', // And this line
                backgroundColor: '#62c191',
                color: 'white',
                '&:hover': {
                  backgroundColor: '#62c191',
                },
                boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .3)',
                textTransform: 'none',
                fontSize: '1rem',
                padding: '0.5rem 2rem',
                borderRadius: '20px',
                transition: 'all 0.3s cubic-bezier(.25,.8,.25,1)',
              }}
            >
              {loading && (
                <div className="absolute right-2 bottom-2.5">
                  <Spinner size="xs" />
                </div>
              )}
              Continue
            </Button>
            <Copyright sx={{ mt: 5 }} />
          </Box>
        </Box>
      </Grid>
    </Grid>
  )
}
