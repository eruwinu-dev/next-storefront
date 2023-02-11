import { useSession } from "next-auth/react"
import Link from "next/link"
import { useRouter } from "next/router"
import React from "react"
import HeaderDropdown from "./HeaderDropdown"

type Props = {}

const Header = ({}: Props) => {
    const { pathname } = useRouter()
    const { status } = useSession()

    return (
        <header>
            <nav>
                <ul>
                    <Link href="/">
                        <h1>Storefront</h1>
                    </Link>
                </ul>
                <ul>
                    <input
                        type="text"
                        className="input input-sm input-bordered"
                        placeholder="Search for anything"
                    />
                </ul>
                {["/auth"].includes(pathname) ? (
                    <ul></ul>
                ) : (
                    <ul className="inline-flex items-center justify-end">
                        <li>
                            {status === "loading" ? (
                                <></>
                            ) : status === "authenticated" ? (
                                <HeaderDropdown />
                            ) : (
                                <Link href="/auth">
                                    <button type="button" className="btn-ghost">
                                        Sign In
                                    </button>
                                </Link>
                            )}
                        </li>
                    </ul>
                )}
            </nav>
        </header>
    )
}

export default Header
