import type { QueryResolvers, MutationResolvers } from 'types/graphql'

import { db } from 'src/lib/db'
import { validate } from '@redwoodjs/api'

export const contacts: QueryResolvers['contacts'] = () => {
  return db.contact.findMany()
}

export const contact: QueryResolvers['contact'] = ({ id }) => {
  return db.contact.findUnique({
    where: { id },
  })
}

export const createContact: MutationResolvers['createContact'] = ({
  input,
}) => {
  validate(input.email, 'email', { email: true })
  validate(input.name, 'name', { length: {min: 3, max: 6} })
  return db.contact.create({
    data: input,
  })
}
