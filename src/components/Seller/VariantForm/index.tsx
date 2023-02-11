import React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { SubmitHandler, useForm } from "react-hook-form"
import useSellerContext, { variantSchema } from "@/context/SellerState"
import { VariantSchema } from "@/types/store"
import { useAddVariant } from "@/hooks/variant/useAddVariant"
import { useEditVariant } from "@/hooks/variant/useEditVariant"
import { useGetProduct } from "@/hooks/product/useGetProduct"

type Props = {
    form: "ADD" | "EDIT"
}

const VariantForm = ({ form }: Props) => {
    const { toggleSellerAction, selectedVariantId } = useSellerContext()

    const { data: product } = useGetProduct({ role: "seller" })
    const { mutateAsync: mutateAddVariant } = useAddVariant()
    const { mutateAsync: mutateEditVariant } = useEditVariant()

    let variant = product?.variants.find(
        (variant) => variant.id === selectedVariantId
    )

    if (form === "EDIT" && !variant) return <></>

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<VariantSchema>({
        resolver: zodResolver(variantSchema),
        mode: "all",
        defaultValues: {
            name: form === "ADD" ? "" : variant ? variant.name : "",
            price:
                form === "ADD"
                    ? undefined
                    : variant
                    ? variant.price
                    : undefined,
        },
    })

    const onSubmit: SubmitHandler<VariantSchema> = async (data) => {
        const prop = form === "ADD" ? "addVariant" : "editVariant"
        toggleSellerAction(prop, "LOADING")
        if (form === "ADD") {
            await mutateAddVariant({ info: data })
        } else if (form === "EDIT") {
            if (!variant) return
            await mutateEditVariant({ info: data, id: variant.id })
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
                    Variant Name
                </label>
                <input
                    type="text"
                    className={[
                        "input input-sm input-bordered",
                        errors.name ? "input-error" : "",
                    ].join(" ")}
                    id="name"
                    placeholder="Variant Name"
                    {...register("name")}
                />
                {errors.name && (
                    <div className="error-message">{errors.name?.message}</div>
                )}
            </div>
            <div className="w-full grid grid-cols-1 grid-flow-row gap-2 place-self-start place-content-start">
                <label className="input-label" htmlFor="Price">
                    Price
                </label>
                <input
                    type="number"
                    step={0.01}
                    className={[
                        "input input-sm input-bordered",
                        errors.price ? "input-error" : "",
                    ].join(" ")}
                    id="price"
                    placeholder="1.00"
                    {...register("price", { valueAsNumber: true })}
                />
                {errors.price && (
                    <div className="error-message">{errors.price?.message}</div>
                )}
            </div>
            {form === "ADD" ? (
                <button type="submit" className="w-full btn btn-sm btn-success">
                    Add Variant
                </button>
            ) : (
                <button type="submit" className="w-full btn btn-sm btn-neutral">
                    Edit Variant
                </button>
            )}
        </form>
    )
}

export default VariantForm
