import NextImage from "@/components/NextImage"
import useSellerContext from "@/context/SellerState"
import { useGetProduct } from "@/hooks/product/useGetProduct"
import { priceFormatter } from "@/utils/priceFormatter"
import { priceRange } from "@/utils/priceRanger"
import React from "react"
import DeleteProductDialog from "./DeleteProductDialog"
import ProductDashboardDropdown from "./ProductDashboardDropdown"
import VariantsList from "./VariantsList"

type Props = {}

const ProductDashboard = (props: Props) => {
    const { data: product } = useGetProduct({ role: "seller" })

    const { selectedVariantId } = useSellerContext()

    if (!product) return <></>

    const selectedVariant = product.variants.find(
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
        <>
            <section className="grid grid-cols-4 grid-flow-row gap-8">
                <div className="col-span-2 row-span-2 relative w-full h-auto aspect-square">
                    {product.images.length ? (
                        <NextImage
                            src={product.images[0]}
                            alt={product.description}
                            className="object-cover object-center rounded-lg"
                        />
                    ) : null}
                </div>
                <div className="col-span-2 w-full p-4 rounded-lg shadow-lg grid grid-cols-1 grid-flow-row place-items-start place-content-start gap-4">
                    <div className="relative w-full">
                        <h1 className="text-3xl font-semibold">
                            {product.name}
                        </h1>
                        <ProductDashboardDropdown product={product} />
                    </div>
                    <div className="">Orders, Ratings</div>
                    <div>
                        {prices.length ? (
                            <h2 className="text-4xl font-bold font-">
                                &#8369;
                                {selectedVariant
                                    ? priceFormatter.format(
                                          selectedVariant.price
                                      )
                                    : priceRange(prices)}
                            </h2>
                        ) : null}
                    </div>
                    <VariantsList />
                </div>
                <div className="col-span-2 w-full p-4 rounded-lg shadow-lg grid grid-cols-1 grid-flow-row place-items-start place-content-start gap-4">
                    <h4 className="text-xl font-semibold">Description</h4>
                    <p>{product.description}</p>
                </div>
            </section>
            <DeleteProductDialog />
        </>
    )
}

export default ProductDashboard
