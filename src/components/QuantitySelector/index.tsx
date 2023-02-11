import React, { ChangeEvent, MouseEvent, useState } from "react"

type Props = {
    quantity: number
    setQuantity: (quantity: number) => void
    disabled?: boolean
}

const QuantitySelector = ({
    quantity,
    setQuantity,
    disabled = false,
}: Props) => {
    const [error, setError] = useState<boolean>(false)

    const changeQuantityFieldHandler = (
        event: ChangeEvent<HTMLInputElement>
    ) => {
        event.preventDefault()
        const value = Number(event.target.value)
        setQuantity(value < 2 ? 1 : value)
    }

    const changeQuantityButtonHandler =
        (direction: -1 | 1) => (event: MouseEvent<HTMLButtonElement>) =>
            setQuantity(quantity + direction)

    return (
        <div className="form-control w-fit">
            <div className="input-group input-group-sm">
                <button
                    type="button"
                    className="btn btn-sm btn-ghost btn-outline"
                    onClick={changeQuantityButtonHandler(-1)}
                    disabled={quantity < 2 || disabled}
                >
                    -
                </button>
                <input
                    type="number"
                    className="w-1/4 input input-sm border-x-0 border-y-1 border-y-black"
                    value={quantity}
                    onChange={changeQuantityFieldHandler}
                    disabled={disabled}
                />
                <button
                    type="button"
                    className="btn btn-sm btn-ghost btn-outline"
                    onClick={changeQuantityButtonHandler(1)}
                    disabled={disabled}
                >
                    +
                </button>
            </div>
        </div>
    )
}

export default QuantitySelector
