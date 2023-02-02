import React, { ReactNode } from "react"
import { Lora, Inter } from "@next/font/google"

import Header from "./Header"

type Props = {
    children: ReactNode
}

const lora = Lora({
    subsets: ["latin"],
})

const inter = Inter({
    subsets: ["latin"],
})

const Layout = ({ children }: Props) => {
    return (
        <>
            <style jsx global>
                {`
                    :root {
                        --lora-font: ${lora.style.fontFamily};
                        --inter-font: ${inter.style.fontFamily};
                    }
                `}
            </style>
            <Header />
            {children}
        </>
    )
}

export default Layout
