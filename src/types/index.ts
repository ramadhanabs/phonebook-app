export interface Phone {
  __typename: string
  number: string
}

export interface IContact {
  __typename: string
  created_at: string
  first_name: string
  id: number
  last_name: string
  phones: Phone[]
}

export interface ContactResponse {
  contact: IContact[]
}
