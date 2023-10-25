import Dexie, { Table } from "dexie"

export interface IContactDB {
  id?: number
  contact_id: number
  first_name: string
  last_name: string
  phones: string
}

export class MySubClassedDexie extends Dexie {
  contacts!: Table<IContactDB>

  constructor() {
    super("db")
    this.version(1).stores({
      contacts: "++id, contact_id, first_name, last_name, phones",
    })
  }
}

export const db = new MySubClassedDexie()
