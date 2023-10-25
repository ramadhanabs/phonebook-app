import { IContactDB } from "@/db/config"
import { getAll, store, destroy } from "@/db/favorite"
import { IContact } from "@/types"
import { useEffect, useState } from "react"

interface UseDBContacsProps {
  enabled: boolean
}

export default function useDBContacts(props: UseDBContacsProps) {
  const [data, setData] = useState<IContactDB[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const fetch = async () => {
    try {
      const res = await getAll()
      setData(res ?? [])
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  const storeContact = async (payload?: IContact) => {
    if (!payload) return
    await store(payload)
  }

  const deleteContact = async (id: number) => {
    await destroy(id)
  }

  useEffect(() => {
    if (props.enabled) fetch()
  }, [props.enabled])

  return { data, storeContact, deleteContact, refetch: fetch, isLoading: isLoading }
}
