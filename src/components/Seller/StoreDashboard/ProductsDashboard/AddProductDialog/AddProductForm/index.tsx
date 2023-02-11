import useSellerContext, { productSchema } from "@/context/SellerState"
import { useAddProduct } from "@/hooks/product/useAddProduct"
import { ProductSchema } from "@/types/store"
import { zodResolver } from "@hookform/resolvers/zod"
import React, { useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import ImageDropzone from "../../../../../ImageDropzone"

type Props = {}

const AddProductForm = (props: Props) => {
    const { toggleSellerAction } = useSellerContext()
    const [images, setImages] = useState<File[]>([])
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ProductSchema>({
        resolver: zodResolver(productSchema),
        mode: "all",
    })

    const { mutateAsync: mutateAddProduct } = useAddProduct()

    const onSubmit: SubmitHandler<ProductSchema> = async (data) => {
        toggleSellerAction("addProduct", "LOADING")
        await mutateAddProduct({
            info: data,
            files: images,
        })
        toggleSellerAction("addProduct", "SUCCESS")
    }

    return (
        <form
            className="grid grid-cols-2 grid-flow-row gap-4"
            onSubmit={handleSubmit(onSubmit)}
        >
            <div className="grid grid-flow-row gap-4">
                <div className="col-span-2 grid grid-flow-row gap-2">
                    <label className="input-label" htmlFor="name">
                        Product Name
                    </label>
                    <input
                        type="text"
                        className={[
                            "input input-sm input-bordered",
                            errors.name ? "input-error" : "",
                        ].join(" ")}
                        id="name"
                        placeholder="Product Name"
                        {...register("name")}
                    />
                    {errors.name && (
                        <div className="error-message">
                            {errors.name?.message}
                        </div>
                    )}
                </div>
                <div className="col-span-2 grid grid-cols-1 grid-flow-row gap-2">
                    <label className="input-label" htmlFor="description">
                        Description
                    </label>
                    <textarea
                        className="textarea textarea-sm textarea-bordered resize-none"
                        rows={4}
                        placeholder="Something about your Product"
                        id="description"
                        {...register("description")}
                    />
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
                        <div className="error-message">
                            {errors.price?.message}
                        </div>
                    )}
                </div>
                <div className="w-full grid grid-cols-1 grid-flow-row gap-2 place-self-start place-content-start">
                    <label className="input-label" htmlFor="quantity">
                        Quantity
                    </label>
                    <input
                        type="number"
                        step={1}
                        placeholder="1"
                        className={[
                            "input input-sm input-bordered",
                            errors.quantity ? "input-error" : "",
                        ].join(" ")}
                        id="quantity"
                        {...register("quantity", {
                            valueAsNumber: true,
                        })}
                    />
                    {errors.quantity && (
                        <div className="error-message">
                            {errors.quantity?.message}
                        </div>
                    )}
                </div>
            </div>
            <div className="grid grid-flow-row gap-4">
                <ImageDropzone
                    title="Product Images"
                    files={images}
                    setFiles={setImages}
                />
            </div>
            <div className="col-span-2 grid grid-cols-2 grid-flow-row gap-4">
                <div />
                <button type="submit" className="w-full btn btn-sm btn-success">
                    Add Product
                </button>
            </div>
        </form>
    )
}

export default AddProductForm
