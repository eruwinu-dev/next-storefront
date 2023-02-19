import { orderMap } from "@/utils/options"
import { OrderProgress } from "@prisma/client"
import React from "react"

type Props = {
    progress: OrderProgress[]
    orient?: "vertical" | "horizontal"
}

const OrderHistory = ({ progress, orient = "vertical" }: Props) => {
    return (
        <div>
            <ul
                className={[
                    "steps",
                    orient === "vertical" ? "steps-vertical" : "steps-vertical",
                ].join(" ")}
            >
                {progress.map((step) => (
                    <li
                        data-content={
                            step.status === "CANCELLATION" ? "✕" : `✓`
                        }
                        className={[
                            "step",
                            step.status === "CANCELLATION"
                                ? "step-error"
                                : "step-success",
                        ].join(" ")}
                        key={step.status}
                    >
                        {orderMap[step.status as keyof typeof orderMap].tense}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default OrderHistory
