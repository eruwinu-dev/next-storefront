import { priceFormatter } from "./priceFormatter"

export const priceRange = (prices: number[]) =>
    prices.length === 2
        ? `${priceFormatter.format(prices[0])}-${priceFormatter.format(
              prices[1]
          )}`
        : priceFormatter.format(prices[0])
