import {
  CreateContactMutation,
  CreateContactMutationVariables,
} from 'types/graphql'

import {
  FieldError,
  Form,
  Label,
  Submit,
  SubmitHandler,
  TextAreaField,
  TextField,
  useForm,
} from '@redwoodjs/forms'
import { MetaTags, useMutation } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/toast'

const CREATE_CONTACT = gql`
  mutation CreateContactMutation($input: CreateContactInput!) {
    createContact(input: $input) {
      id
    }
  }
`

interface FormValues {
  name: string
  email: string
  message: string
}

const ContactPage = () => {
  const [create, { loading, error }] = useMutation<
    CreateContactMutation, // return type
    CreateContactMutationVariables // input type
  >(CREATE_CONTACT, {
    onCompleted: () => {
      // on success of mutation
      toast.success('Thank you for your submission!')
      formMethods.reset() //clear form
    },
  })

  const formMethods = useForm<FormValues>({ mode: 'onBlur' })
  const onSubmit: SubmitHandler<FormValues> = async (data: FormValues) => {
    await create({
      variables: {
        input: data,
      },
    })
  }
  return (
    <>
      <MetaTags title="Contact" description="Contact page" />

      <Toaster />
      <Form
        onSubmit={onSubmit}
        config={{ mode: 'onBlur' }}
        error={error}
        formMethods={formMethods}
      >
        {/*<FormError error={error} wrapperClassName="form-error" />*/}
        <Label name="name" errorClassName="error">
          Name
        </Label>
        <TextField
          name="name"
          validation={{ required: true, min: 10 }}
          errorClassName="error"
        />
        <FieldError name="name" className="error" />

        <Label name="email" errorClassName="error">
          Email
        </Label>
        <TextField
          errorClassName="error"
          name="email"
          validation={{
            required: true,
            pattern: {
              value: /[^@]+@[^.]+\..+/,
              message: 'Please enter a valid email address',
            },
          }}
        />
        <FieldError name="email" className="error" />

        <Label name="message" errorClassName="error">
          Message
        </Label>
        <TextAreaField
          errorClassName="error"
          name="message"
          validation={{ required: true }}
        />
        <FieldError name="message" className="error" />

        <Submit disabled={loading}>Save</Submit>
      </Form>
    </>
  )
}

export default ContactPage
