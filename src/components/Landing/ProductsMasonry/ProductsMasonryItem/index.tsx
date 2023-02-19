import { CompleteProduct } from "@/types/store"
import loader from "@/utils/loader"
import { priceFormatter } from "@/utils/priceFormatter"
import Image from "next/image"
import Link from "next/link"
import React from "react"

type Props = {
    product: CompleteProduct
}

const ProductsMasonryItem = ({ product }: Props) => {
    const prices = product.variants
        .map((variant) => variant.price)
        .sort((price1, price2) => price1 - price2)

    return (
        <Link href={`product/${product.id}`}>
            <div className="w-full inline-block bg-gray-300 rounded-lg">
                <div className="w-full relative aspect-square">
                    {product.images.length ? (
                        <Image
                            fill
                            src={product.images[0]}
                            alt={product.description}
                            loader={loader}
                            className="rounded-lg transition"
                        />
                    ) : null}
                    <div className="absolute bottom-3 left-3">
                        <span className="px-4 py-1 rounded-xl bg-primary-focus text-base-100">
                            &#8369;{priceFormatter.format(prices[0])}
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default ProductsMasonryItem
