import NextImage from "@/components/NextImage"
import { useGetProduct } from "@/hooks/product/useGetProduct"
import { priceFormatter } from "@/utils/priceFormatter"
import React from "react"
import DeleteProductDialog from "./DeleteProductDialog"
import ProductDashboardDropdown from "./ProductDashboardDropdown"
import VariantsList from "./VariantsList"

type Props = {}

const ProductDashboard = (props: Props) => {
    const { data: product } = useGetProduct({ role: "seller" })

    if (!product) return <></>

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
                        <h2 className="text-4xl font-bold font-">
                            {priceFormatter.format(product.price)}
                        </h2>
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
