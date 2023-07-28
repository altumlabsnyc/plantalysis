import {
  Box,
  Button,
  CssBaseline,
  Link,
  TextField,
  Typography,
  Radio,
  RadioGroup,
  Select,
  MenuItem,
  FormControlLabel,
  FormControl,
  InputLabel,
} from '@mui/material'

import Input from '@/types/Input'
import useUserDetails from '@/hooks/useUserDetails'
import { useUser } from '@supabase/auth-helpers-react'
import { FormEvent } from 'react' // Import FormEvent type

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

export interface GeneralFormProps<T> {
  inputs: Input[] | undefined
  createT: (formData: FormEvent<HTMLFormElement>) => T
  oldT: Array<T>
  insertT: (toInsert: T, oldData: Array<T>) => void
}

export default function GeneralForm<T>({
  inputs,
  createT,
  oldT,
  insertT,
}: GeneralFormProps<T>) {
  const user = useUser()

  const handleSubmit = (formData: FormEvent<HTMLFormElement>) => {
    const toInsert = createT(formData)
    insertT(toInsert, oldT)
  }

  return (
    <div>
      <CssBaseline />

      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
        {inputs &&
          inputs.map((input) => (
            <div>
              {input.type !== 'radio' && input.type !== 'dropdown' && (
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id={input.id}
                  label={input.name}
                  type={input.type}
                  name={input.id}
                  key={input.id}
                  autoComplete={`Enter your ${input.name.toLowerCase()}`}
                  autoFocus
                />
              )}
              {input.type == 'radio' && (
                <FormControl id={input.id}>
                  Enter your {input.name}
                  <RadioGroup key={input.id}>
                    {input.options?.map((option) => (
                      <FormControlLabel
                        value={option}
                        control={<Radio />}
                        label={option}
                        key={`${input.id}-${option}`}
                      />
                    ))}
                  </RadioGroup>
                </FormControl>
              )}
              {input.type == 'dropdown' && (
                <FormControl
                  sx={{
                    // marginTop: 35,
                    // width: 200,
                    display: 'flex',
                  }}
                  id={input.id}
                  key={input.id}
                  autoFocus
                >
                  <InputLabel id="simple-select-label">{input.name}</InputLabel>
                  <Select label={input.name}>
                    {input.options?.map((option) => (
                      <MenuItem value={option} key={`${input.id}-${option}`}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            </div>
          ))}

        <Button
          type="submit"
          variant="contained"
          sx={{
            mt: 3,
            alignItems: 'right',
            mb: 2,
            backgroundColor: '#CFAA41',
            color: 'white',
            '&:hover': {
              backgroundColor: '#CFAA41', // Maintain the same background color on hover
            },
          }}
        >
          Continue
        </Button>

        <Copyright sx={{ mt: 5 }} />
      </Box>
    </div>
  )
}
