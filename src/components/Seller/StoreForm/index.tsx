import React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { SubmitHandler, useForm } from "react-hook-form"
import useSellerContext, { storeSchema } from "@/context/SellerState"
import { StoreSchema } from "@/types/store"
import { useGetStore } from "@/hooks/store/useGetStore"
import { useEditStore } from "@/hooks/store/useEditStore"
import { useAddStore } from "@/hooks/store/useAddStore"

type Props = {
    form: "ADD" | "EDIT"
}

const StoreForm = ({ form }: Props) => {
    const { toggleSellerAction } = useSellerContext()

    const { data: store } = useGetStore()
    const { mutateAsync: mutateAddStore } = useAddStore()
    const { mutateAsync: mutateEditStore } = useEditStore()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<StoreSchema>({
        resolver: zodResolver(storeSchema),
        mode: "all",
        defaultValues: {
            name: form === "ADD" ? "" : store ? store.name : "",
            description: form === "ADD" ? "" : store ? store.description : "",
        },
    })

    const onSubmit: SubmitHandler<StoreSchema> = async (data) => {
        const prop = form === "ADD" ? "addStore" : "editStore"
        toggleSellerAction(prop, "LOADING")
        if (form === "ADD") {
            await mutateAddStore(data)
        } else if (form === "EDIT") {
            if (!store) return
            await mutateEditStore(data)
        }
        toggleSellerAction(prop, "SUCCESS")
    }

    return (
        <form
            className="grid grid-cols-1 grid-flow-row gap-4"
            onSubmit={handleSubmit(onSubmit)}
        >
            <div className="grid grid-cols-1 grid-flow-row gap-2">
                <label className="input-label" htmlFor="name">
                    Store Name
                </label>
                <input
                    type="text"
                    className={[
                        "input input-sm input-bordered",
                        errors.name ? "input-error" : "",
                    ].join(" ")}
                    id="name"
                    placeholder="Store Name"
                    {...register("name")}
                />
                {errors.name && (
                    <div className="error-message">{errors.name?.message}</div>
                )}
                <label className="input-label" htmlFor="description">
                    Description
                </label>
            </div>
            <textarea
                className="textarea textarea-sm textarea-bordered resize-none"
                rows={4}
                placeholder="Something about your store"
                id="description"
                {...register("description")}
            />
            {form === "ADD" ? (
                <button type="submit" className="w-full btn btn-sm btn-success">
                    Add Store
                </button>
            ) : (
                <button type="submit" className="w-full btn btn-sm btn-neutral">
                    Edit Store
                </button>
            )}
        </form>
    )
}

export default StoreForm
