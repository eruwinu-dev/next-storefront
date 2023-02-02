import { getUser } from "@/lib/getUser"
import { GetServerSideProps } from "next"
import { signIn } from "next-auth/react"
import Head from "next/head"
import React, { MouseEvent } from "react"

type Props = {}

const Auth = ({}: Props) => {
    const signInHandler = async (event: MouseEvent<HTMLButtonElement>) =>
        await signIn("google")

    return (
        <>
            <Head>
                <title>Sign In | Storefront</title>
            </Head>
            <main className="inline-flex items-center">
                <div className="-translate-y-[10vh] lg:w-3/12 md:w-4/12 sm:w-8/12 h-auto mx-auto p-4 aspect-square flex flex-col items-center justfy-start space-y-8 rounded-lg shadow-lg">
                    <h1 className="text-6xl font-serif font-extrabold">S</h1>
                    <h2 className="text-3xl font-bold text-center font-serif">
                        Your lowkey marketplace.
                    </h2>
                    <p className="font-serif text-center">
                        Storefront is your one-stop store to get an unforgetable
                        shopping experience.
                    </p>
                    <button type="button" onClick={signInHandler}>
                        Continue with Google
                    </button>
                </div>
            </main>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const user = await getUser(context)

    if (user) {
        return {
            redirect: {
                destination: "/home",
                permanent: false,
            },
        }
    }

    return {
        props: {
            user,
        },
    }
}

export default Auth
