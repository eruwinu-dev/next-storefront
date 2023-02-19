import NextImage from "@/components/NextImage"
import QuantitySelector from "@/components/QuantitySelector"
import useUserContext from "@/context/UserState"
import { useAddToCart } from "@/hooks/cart/useAddToCart"
import { useGetProduct } from "@/hooks/product/useGetProduct"
import { useGetUser } from "@/hooks/user/useGetUser"
import { priceFormatter } from "@/utils/priceFormatter"
import { priceRange } from "@/utils/priceRanger"
import React, { MouseEvent, useState } from "react"
import VariantsSelect from "./VariantsSelect"

type Props = {}

const ProductOrderBoard = (props: Props) => {
    const {
        selectedVariantId,
        selectVariant,
        toggleUserDialog,
        toggleUserAction,
    } = useUserContext()
    const [quantity, setQuantity] = useState<number>(1)

    const { data: user } = useGetUser()
    const { data: product, isFetching } = useGetProduct({ role: "user" })
    const { mutateAsync: mutateAddToCart } = useAddToCart()

    const addToCartHandler = async (event: MouseEvent<HTMLButtonElement>) => {
        if (!user) {
            toggleUserDialog("promptSignIn")
            return
        }
        if (!product || !selectedVariantId) return
        toggleUserDialog("addToCart")
        toggleUserAction("addToCart", "LOADING")
        await mutateAddToCart({ quantity, variantId: selectedVariantId })
        toggleUserAction("addToCart", "SUCCESS")
        setQuantity(1)
        selectVariant(null)
    }

    if (isFetching) return <></>

    if (!product) return <></>

    let variants = product.variants

    const selectedVariant = variants.find(
        (variant) => variant.id === selectedVariantId
    )

    const prices: number[] = product.variants
        .map((variant) => variant.price)
        .sort((price1, price2) => price1 - price2)
        .filter(
            (price, index) =>
                index === 0 || index === product.variants.length - 1
        )

    return (
        <section className="grid grid-cols-2 grid-flow-row gap-8 p-8">
            <div className="relative aspect-square rounded-lg row-span-2">
                {product.images.length ? (
                    <NextImage
                        src={product.images[0]}
                        alt={product.name}
                        className="rounded-lg"
                    />
                ) : null}
            </div>
            <div className="w-full grid grid-cols-1 grid-flow-row gap-8 rounded-lg shadow-lg p-4">
                <div className="space-y-2">
                    <h1 className="text-2xl font-bold">{product.name}</h1>
                    <h2 className="text-4xl font-bold">
                        {prices.length ? (
                            <h3 className="text-4xl font-bold font-">
                                &#8369;
                                {selectedVariant
                                    ? priceFormatter.format(
                                          selectedVariant.price
                                      )
                                    : priceRange(prices)}
                            </h3>
                        ) : null}
                    </h2>
                </div>
                <div className="grid grid-cols-1 grid-flow-row gap-2">
                    <div>
                        <h3 className="font-semibold">
                            Quantity<span className="text-error">*</span>
                        </h3>
                    </div>
                    <QuantitySelector
                        quantity={quantity}
                        setQuantity={setQuantity}
                    />
                </div>
                <div className="grid grid-cols-1 grid-flow-row gap-2">
                    <div>
                        <h3 className="font-semibold">
                            Variant<span className="text-error">*</span>
                        </h3>
                    </div>
                    <VariantsSelect variants={variants} />
                </div>
                <div className="grid grid-cols-1 grid-flow-row">
                    <button
                        type="button"
                        className="w-full btn btn-sm mx-auto"
                        disabled={!selectedVariantId}
                        onClick={addToCartHandler}
                    >
                        {selectedVariantId ? "Add to Cart" : "Select Variant"}
                    </button>
                </div>
            </div>
            <div className="p-4 grid grid-cols-1 grid-flow-row gap-4 rounded-lg shadow-lg">
                <div className="grid grid-cols-1 grid-flow-row gap-4">
                    <h3 className="text-lg font-semibold">Description</h3>
                    <p>{product.description}</p>
                </div>
            </div>
            <div className="p-4 grid grid-cols-1 grid-flow-row gap-4 rounded-lg shadow-lg">
                <div className="grid grid-cols-1 grid-flow-row gap-4">
                    <h3 className="text-lg font-semibold">Ratings</h3>
                </div>
            </div>

            <div className="p-4 grid grid-cols-1 grid-flow-row gap-4 rounded-lg shadow-lg">
                <div className="grid grid-cols-1 grid-flow-row gap-4">
                    <h3 className="text-lg font-semibold">Store</h3>
                    <p>{product.store.name}</p>
                </div>
            </div>
        </section>
    )
}

export default ProductOrderBoard
