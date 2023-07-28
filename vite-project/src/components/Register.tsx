import {
  Box,
  Button,
  CssBaseline,
  Radio,
  FormControlLabel,
  Grid,
  Link,
  Paper,
  RadioGroup,
  TextField,
  Typography,
  FormControl,
} from '@mui/material'
import * as React from 'react'

import background from './assets/login/img/frame.png'

import { AllRolesData, handleSignUp } from '@/hooks/handleSignUp'
import { users, generalInputs } from '@/utils/formInputs'

import {
  ProducerUser,
  RegulatorUser,
  ConsumerUser,
  UniversityUser,
  BaseUser,
  LabUser,
  UserRole,
} from '@/types/supabaseAlias'

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
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)

    // populate general Inputs:
    if (currentTab == 1) {
      handleGeneralInputsSubmit(data)
    }

    //populate additional inputs and submit all
    if (currentTab == 2) {
      handleAdditionalInputsSubmit(data)
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
    const phone = data.get('phone')?.toString() || null
    const pass = data.get('password')?.toString()
    if (pass != undefined) {
      setPassword(pass)
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
      handleSignUp({
        userDetails: newGeneralUserData,
        roleData: roleData,
        password: pass,
      })
    }
  }

  function handleAdditionalInputsSubmit(data: FormData) {
    if (generalUserData) {
      switch (selectedUser) {
        case 'producer':
          console.log(data.get('license_type'))
          console.log(helperProdInfo(data))
          return
          // handleSignUp({
          //   userDetails: generalUserData,
          //   roleData: { producerData: helperProdInfo(data) },
          //   password: password,
          // })
          break
        case 'university':
          handleSignUp({
            userDetails: generalUserData,
            roleData: { universityData: helperEduInfo(data) },
            password: password,
          })
          break
        case 'lab':
          handleSignUp({
            userDetails: generalUserData,
            roleData: { labData: helperLabInfo(data) },
            password: password,
          })
          break
        case 'regulator':
          handleSignUp({
            userDetails: generalUserData,
            roleData: { regulatorData: helperGovInfo(data) },
            password: password,
          })
          break
      }
    }
  }

  function helperEduInfo(data: FormData): UniversityUser {
    const id = ''
    const lab_address = data.get('university_lab_address')?.toString() || null
    const primary_investigator =
      data.get('primary_investigator')?.toString() || null
    const university_department =
      data.get('university_department')?.toString() || null
    const university_name = data.get('university_name')?.toString() || null

    const uniData: UniversityUser = {
      lab_address: lab_address,
      university_department: university_department,
      university_name: university_name,
      id: id,
      primary_investigator: primary_investigator,
    }
    return uniData
  }

  function helperProdInfo(data: FormData): ProducerUser {
    const id = ''
    const primary_facility_address =
      data.get('primary_facility_address')?.toString() || null
    const billing_address = data.get('billing_address')?.toString() || null
    const legal_name = data.get('legal_name')?.toString() || null
    const common_name = data.get('common_name')?.toString() || null
    const license_type = data.get('license_type')?.toString() || null
    // TODO: fix Radio for license type instead of expecting that input
    const actualLisenceType =
      license_type == 'AUCC' || license_type == 'AUCP' || license_type == 'AUHC'
        ? license_type
        : null
    const license_number =
      data.get('producer_license_number')?.toString() || null
    const contact_phone = data.get('producer_contact_phone')?.toString() || null
    const prodData: ProducerUser = {
      primary_facility_address: primary_facility_address,
      billing_address: billing_address,
      legal_name: legal_name,
      common_name: common_name,
      license_type: actualLisenceType,
      license_number: license_number,
      id: id,
      contact_phone: contact_phone,
    }
    return prodData
  }

  function helperLabInfo(data: FormData): LabUser {
    const id = ''
    const lab_address = data.get('lab_address')?.toString() || null
    const contact_phone = data.get('lab_contact_phone')?.toString() || null
    const license_number = data.get('lab_license_number')?.toString() || null
    const actualLicenseNumber = license_number ? parseInt(license_number) : null
    const lab_name = data.get('lab_name')?.toString() || null
    const owner_name = data.get('owner_name')?.toString() || null
    const labData: LabUser = {
      lab_address: lab_address,
      contact_phone: contact_phone,
      lab_name: lab_name,
      id: id,
      owner_name: owner_name,
      license_number: actualLicenseNumber,
    }
    return labData
  }

  function helperGovInfo(data: FormData): RegulatorUser {
    const id = ''
    const mailing_address = data.get('mailing_address')?.toString() || null
    const regulator_name = data.get('regulator_name')?.toString() || null
    const contact_phone =
      data.get('regulator_contact_phone')?.toString() || null

    const govData: RegulatorUser = {
      mailing_address: mailing_address,
      regulator_name: regulator_name,
      contact_phone: contact_phone,
      id: id,
    }
    return govData
  }

  const handleSelectingUser = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedUser(event.target.value as UserRole)
  }

  //useState variable declaration
  const [selectedUser, setSelectedUser] = React.useState<UserRole>()
  const [currentTab, setCurrentTab] = React.useState(0)
  const [generalUserData, setGeneralUserData] = React.useState<BaseUser>()
  const [password, setPassword] = React.useState<string>('')

  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: `url(${background})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative', // Add relative position to the Grid item
        }}
      >
        <Typography
          component="h1"
          variant="h3"
          sx={{
            position: 'absolute',
            top: '20%',
            left: '20%',
            transform: 'translate(-50%, -50%)',
            color: 'white',
            fontWeight: 'bold',
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
              Who are you?
            </Typography>
          )}
          {currentTab == 1 ||
            (currentTab == 2 && (
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
            ))}
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 1 }}
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
                      }}
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
                          />
                          <span style={{ marginLeft: 4 }}>
                            {
                              <Typography component="p" variant="h5">
                                {user.name}
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
                <Typography variant="h5">{selectedUser}</Typography>
                {generalInputs.map((input) => (
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
                  />
                ))}
              </div>
            )}
            {currentTab == 2 && (
              <div>
                <Typography variant="h5">{selectedUser}</Typography>z
                {users
                  .filter((user) => selectedUser === user.userType)
                  .map((user) => (
                    <div key={user.name}>
                      {user.inputs?.map((input) => (
                        <div>
                          {input.type === 'radio' && (
                            <FormControl key={input.id} id={input.id}>
                              Enter your {input.name}
                              {input.options?.map((option) => (
                                <FormControlLabel
                                  key={`${input.id}-${option}`}
                                  value={option}
                                  control={<Radio />}
                                  label={option}
                                />
                              ))}
                            </FormControl>
                          )}
                          {input.id !== 'radio' && (
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
                            />
                          )}
                        </div>
                        // Render "license_number" text field after "license_type"
                        // return null
                      ))}
                    </div>
                  ))}
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
                backgroundColor: '#CFAA41',
                color: 'white',
                '&:hover': {
                  backgroundColor: '#A98632',
                },
                boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .3)',
                textTransform: 'none',
                fontSize: '1rem',
                padding: '0.5rem 2rem',
                borderRadius: '20px',
                transition: 'all 0.3s cubic-bezier(.25,.8,.25,1)',
              }}
            >
              Continue
            </Button>
            <Copyright sx={{ mt: 5 }} />
          </Box>
        </Box>
      </Grid>
    </Grid>
  )
}
