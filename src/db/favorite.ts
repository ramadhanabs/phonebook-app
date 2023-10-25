import { IContact } from "@/types"
import { db } from "./config"

export const getAll = async () => {
  try {
    const result = await db.contacts.toArray()
    return result
  } catch (error) {
    console.error
  }
}

export const store = async (contact: IContact) => {
  const { first_name, last_name, id, phones } = contact
  try {
    await db.contacts.add({
      contact_id: id,
      first_name,
      last_name,
      phones: JSON.stringify(phones),
    })
  } catch (error) {
    console.error
  }
}

export const destroy = async (id: number) => {
  try {
    await db.contacts.delete(id)
  } catch (error) {
    console.error
  }
}
