/**
 * Ccomponent that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/how-to/querying-data/use-static-query/
 */

import * as React from "react"
import { useEffect, useState } from "react"
// import { useStaticQuery, graphql } from "gatsby"
// import { StaticImage } from "gatsby-plugin-image"

const EbayProfitCalculator = () => {
  // const data = useStaticQuery(graphql`
  //   query BioQuery {
  //     site {
  //       siteMetadata {
  //         author {
  //           name
  //           summary
  //         }
  //         social {
  //           twitter
  //         }
  //       }
  //     }
  //   }
  // `)

  // Set these values by editing "siteMetadata" in gatsby-config.js
  // const author = data.site.siteMetadata?.author
  // const social = data.site.siteMetadata?.social

  const TAX = 0.03
  const FEES = 0.12
  const FIXED_COST = 71
  const EURO = 0.23

  const [price, setPrice] = useState(0)
  const [profit, setProfit] = useState(0)
  const [finalPrice, setFinalPrice] = useState(0)

  useEffect(() => {
    setFinalPrice(getFinalPrice())
  }, [price, profit])

  const getFinalPrice = () => {
    return ((price + profit) / (1 - FEES - TAX) + FIXED_COST) * EURO.toFixed(2)
  }

  const handleChange = event => {
    switch (event.target.name) {
      case "price":
        setPrice(parseFloat(event.target.value))
        break
      case "profit":
        setProfit(parseFloat(event.target.value))
        break
      default:
        break
    }
  }

  return (
    <div className="">
      <p>Kalkulator dla legowisk</p>
      <form>
        <label htmlFor="price">Cena zakupu (zł) </label>
        <input
          id="price"
          type="number"
          name="price"
          placeholder="Cena zakupu"
          value={price}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="profit">Oczekiwany zysk (zł) </label>
        <input
          id="profit"
          type="number"
          name="profit"
          placeholder="Oczekiwany zysk"
          value={profit}
          onChange={handleChange}
        />
        <br />
        <br />
        <label htmlFor="finalPrice">Cena końcowa (euro) </label>
        <input
          id="finalPrice"
          type="number"
          name="finalPrice"
          placeholder="Cena końcowa"
          value={finalPrice}
          readOnly
        />
      </form>
    </div>
  )
}

export default EbayProfitCalculator
