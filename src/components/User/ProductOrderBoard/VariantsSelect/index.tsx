import useUserContext from "@/context/Userstate"
import { Variant } from "@prisma/client"
import React, { MouseEvent } from "react"

type Props = {
    variants: Variant[]
}

const VariantsSelect = ({ variants }: Props) => {
    const { selectedVariantId, selectVariant } = useUserContext()

    const toggleSelectVariant =
        (id: string) => (event: MouseEvent<HTMLButtonElement>) => {
            selectVariant(id)
        }

    return (
        <div className="w-full flex flex-row items-center justify-start flex-wrap space-x-4">
            {variants.map((variant) => (
                <button
                    key={variant.id}
                    type="button"
                    className={[
                        "btn btn-sm mb-4",
                        variant.id === selectedVariantId
                            ? "btn-success"
                            : "btn-primary",
                    ].join(" ")}
                    onClick={toggleSelectVariant(variant.id)}
                >
                    {variant.name}
                </button>
            ))}
        </div>
    )
}

export default VariantsSelect
