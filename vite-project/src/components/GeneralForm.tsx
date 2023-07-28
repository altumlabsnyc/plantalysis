import {
  Box,
  Button,
  CssBaseline,
  FormControl,
  FormControlLabel,
  Link,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@mui/material'

import useUserDetails from '@/hooks/useUserDetails'
import Input from '@/types/Input'
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
  inputs: Input[]
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

  const { data: generalUserData, error, isLoading } = useUserDetails(user)
  const handleSubmit = (formData: FormEvent<HTMLFormElement>) => {
    const toInsert = createT(formData)
    insertT(toInsert, oldT)
  }

  return (
    <div>
      <CssBaseline />

      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
        {inputs.map((input) => (
          <div key={input.id}>
            {input.type !== 'radio' && (
              <TextField
                margin="normal"
                required
                fullWidth
                id={input.id}
                label={input.name}
                name={input.id}
                key={input.id}
                autoComplete={`Enter your ${input.name.toLowerCase()}`}
                autoFocus
              />
            )}
            {input.type == 'radio' && (
              <FormControl>
                Enter your {input.name}
                <RadioGroup>
                  {input.options?.map((option) => (
                    <FormControlLabel
                      key={option}
                      value={option}
                      control={<Radio />}
                      label={option}
                    />
                  ))}
                </RadioGroup>
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
