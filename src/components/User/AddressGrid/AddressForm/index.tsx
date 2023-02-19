import useUserContext, { addressSchema } from "@/context/UserState"
import { useAddAddress } from "@/hooks/address/useAddAddress"
import { useEditAddress } from "@/hooks/address/useEditAddress"
import { useGetAddress } from "@/hooks/address/useGetAddress"
import { useGetUser } from "@/hooks/user/useGetUser"
import { AddressSchema } from "@/types/user"
import { zodResolver } from "@hookform/resolvers/zod"
import React, { useEffect } from "react"
import { SubmitHandler, useForm } from "react-hook-form"

type Props = {
    form: "ADD" | "EDIT"
}

const AddressForm = ({ form }: Props) => {
    const {
        toggleUserAction,
        selectedAddressId,
        userDialog: { editAddress: editAddressDialog },
    } = useUserContext()
    const { data: user } = useGetUser()

    const { data: address } = useGetAddress({ id: selectedAddressId as string })

    const { mutateAsync: mutateAddAddress } = useAddAddress()
    const { mutateAsync: mutateEditAddress } = useEditAddress()

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<AddressSchema>({
        resolver: zodResolver(addressSchema),
        mode: "all",
    })

    const onSubmit: SubmitHandler<AddressSchema> = async (data) => {
        const prop = form === "ADD" ? "addAddress" : "editAddress"
        toggleUserAction(prop, "LOADING")
        if (form === "ADD") {
            await mutateAddAddress(data)
        } else if (form === "EDIT") {
            await mutateEditAddress({ info: data, id: address?.id as string })
        }
        toggleUserAction(prop, "SUCCESS")
    }

    useEffect(() => {
        setValue("name", user?.name as string)
        if (form === "EDIT" && address) {
            setValue("phone", address.phone)
            setValue("addressLine", address.addressLine)
            setValue("streetName", address.streetName)
            setValue("postalCode", address.postalCode)
            setValue("label", address.label)
            setValue("isDefault", address.isDefault)
        }
        return () => {}
    }, [address])

    if (form === "EDIT" && !address) return <></>
    if (!user) return <></>

    return (
        <form
            className="grid grid-cols-2 grid-flow-row gap-8"
            onSubmit={handleSubmit(onSubmit)}
        >
            <div className="grid grid-cols-2 grid-flow-row gap-4 place-items-start">
                <div className="w-full grid grid-cols-1 grid-flow-row gap-2">
                    <label className="input-label" htmlFor="name">
                        Contact Name
                    </label>
                    <input
                        type="text"
                        className={[
                            "input input-sm input-bordered",
                            errors.name ? "input-error" : "",
                        ].join(" ")}
                        id="name"
                        placeholder="Contact Name"
                        {...register("name")}
                    />
                    {errors.name && (
                        <div className="error-message">
                            {errors.name?.message}
                        </div>
                    )}
                </div>
                <div className="w-full grid grid-cols-1 grid-flow-row gap-2">
                    <label className="input-label" htmlFor="phone">
                        Contact Number
                    </label>
                    <input
                        type="text"
                        className={[
                            "input input-sm input-bordered",
                            errors.name ? "input-error" : "",
                        ].join(" ")}
                        id="phone"
                        placeholder="09XXXXXXXXX"
                        {...register("phone")}
                    />
                    {errors.phone && (
                        <div className="error-message">
                            {errors.phone?.message}
                        </div>
                    )}
                </div>
                <div className="col-span-2 w-full grid grid-cols-1 grid-flow-row gap-2">
                    <label className="input-label" htmlFor="addressLine">
                        City, Province Address
                    </label>
                    <textarea
                        rows={3}
                        className={[
                            "textarea textarea-sm textarea-bordered resize-none",
                            errors.addressLine ? "textarea-error" : "",
                        ].join(" ")}
                        id="addressLine"
                        placeholder="City, Province Address"
                        {...register("addressLine")}
                    />
                    {errors.addressLine && (
                        <div className="error-message">
                            {errors.addressLine?.message}
                        </div>
                    )}
                </div>
                <div className="col-span-2 w-full grid grid-cols-1 grid-flow-row gap-2">
                    <label className="input-label" htmlFor="streetName">
                        Street
                    </label>
                    <input
                        type="text"
                        className={[
                            "input input-sm input-bordered",
                            errors.streetName ? "input-error" : "",
                        ].join(" ")}
                        id="streetName"
                        placeholder="Street Name"
                        {...register("streetName")}
                    />
                    {errors.streetName && (
                        <div className="error-message">
                            {errors.streetName?.message}
                        </div>
                    )}
                </div>
                <div className="w-full grid grid-cols-1 grid-flow-row gap-2">
                    <label className="input-label" htmlFor="postalCode">
                        Postal Code
                    </label>
                    <input
                        type="number"
                        min={1}
                        step={1}
                        max={9999}
                        className={[
                            "input input-sm input-bordered",
                            errors.postalCode ? "input-error" : "",
                        ].join(" ")}
                        id="postalCode"
                        placeholder="Postal Code"
                        {...register("postalCode")}
                    />
                    {errors.postalCode && (
                        <div className="error-message">
                            {errors.postalCode?.message}
                        </div>
                    )}
                </div>
                <div className="w-full grid grid-cols-1 grid-flow-row gap-2">
                    <label className="input-label" htmlFor="label">
                        Label
                    </label>
                    <input
                        type="text"
                        className={[
                            "input input-sm input-bordered",
                            errors.label ? "input-error" : "",
                        ].join(" ")}
                        id="label"
                        placeholder="Label"
                        {...register("label")}
                    />
                    {errors.label && (
                        <div className="error-message">
                            {errors.label?.message}
                        </div>
                    )}
                </div>
                <div className="col-span-2 inline-flex items-center space-x-2">
                    <input
                        type="checkbox"
                        id="isDefault"
                        {...register("isDefault")}
                    />
                    <label htmlFor="default">Set as default address</label>
                </div>
            </div>
            <div className="grid grid-cols-1 grid-flow-row gap-4">
                <div className=""></div>
            </div>
            <div />
            <div className="">
                {form === "ADD" ? (
                    <button
                        type="submit"
                        className="btn btn-sm btn-block btn-success"
                    >
                        Add Address
                    </button>
                ) : (
                    <button
                        type="submit"
                        className="btn btn-sm btn-block btn-neutral"
                    >
                        Edit Address
                    </button>
                )}
            </div>
        </form>
    )
}

export default AddressForm
