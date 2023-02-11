import { AddressSchema } from "@/types/user"
import { fetcher } from "@/utils/fetcher"
import { useMutation, useQueryClient } from "@tanstack/react-query"

type Data = {
    info: AddressSchema
    id: string
}

export const editAddress = async (data: Data) => {
    const { info, id } = data
    const { address } = await fetcher(
        "/api/address/edit",
        "POST",
        JSON.stringify({ info, id })
    )
    return address
}

export const useEditAddress = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationKey: ["edit-address"],
        mutationFn: (data: Data) => editAddress(data),
        onSuccess: () => queryClient.invalidateQueries(["user", "addresses"]),
        onError: () => {},
    })
}
