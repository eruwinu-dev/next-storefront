import React, { ReactNode } from "react"
import { Lora, Inter } from "@next/font/google"

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
            {children}
            <footer className="footer p-8 bg-primary-focus text-base-100 grid grid-cols-1 grid-flow-row place-items-center">
                Made by E. Encisa
            </footer>
        </>
    )
}

export default Layout
