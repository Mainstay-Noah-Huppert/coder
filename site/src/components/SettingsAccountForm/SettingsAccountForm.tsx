import TextField from "@material-ui/core/TextField"
import { ErrorSummary } from "components/ErrorSummary/ErrorSummary"
import { FormikContextType, FormikErrors, useFormik } from "formik"
import { FC } from "react"
import * as Yup from "yup"
import { getFormHelpersWithError, nameValidator, onChangeTrimmed } from "../../util/formUtils"
import { LoadingButton } from "../LoadingButton/LoadingButton"
import { Stack } from "../Stack/Stack"

interface AccountFormValues {
  username: string
}

export const Language = {
  usernameLabel: "Username",
  emailLabel: "Email",
  updateSettings: "Update settings",
}

const validationSchema = Yup.object({
  username: nameValidator(Language.usernameLabel),
})

export type AccountFormErrors = FormikErrors<AccountFormValues>

export interface AccountFormProps {
  email: string
  isLoading: boolean
  initialValues: AccountFormValues
  onSubmit: (values: AccountFormValues) => void
  updateProfileError?: Error | unknown
}

export const AccountForm: FC<AccountFormProps> = ({
  email,
  isLoading,
  onSubmit,
  initialValues,
  updateProfileError,
}) => {
  const form: FormikContextType<AccountFormValues> = useFormik<AccountFormValues>({
    initialValues,
    validationSchema,
    onSubmit,
  })
  const getFieldHelpers = getFormHelpersWithError<AccountFormValues>(form, updateProfileError)

  return (
    <>
      <form onSubmit={form.handleSubmit}>
        <Stack>
          {updateProfileError && <ErrorSummary error={updateProfileError} />}
          <TextField
            disabled
            fullWidth
            label={Language.emailLabel}
            value={email}
            variant="outlined"
          />
          <TextField
            {...getFieldHelpers("username")}
            onChange={onChangeTrimmed(form)}
            autoComplete="username"
            fullWidth
            label={Language.usernameLabel}
            variant="outlined"
          />

          <div>
            <LoadingButton loading={isLoading} type="submit" variant="contained">
              {isLoading ? "" : Language.updateSettings}
            </LoadingButton>
          </div>
        </Stack>
      </form>
    </>
  )
}
