import React, { useState, useRef, useEffect } from "react"
import { parseToFloat } from "../../../helpers/parseNumbers"

const ProfitCalculator = ({
  data: { supplierData, fixedCostsData, percentageFeesData },
}) => {
  const VAT_DE = 19 // VAT DE 19%
  const [supplierCosts, setSupplierCosts] = useState(0)
  const [fixedCosts, setFixedCosts] = useState(0)
  const [percentageFees, setPercentageFees] = useState(0)
  const [euroCurrency, setEuroCurrency] = useState(0.23)
  const [price, setPrice] = useState(0)
  const [profit, setProfit] = useState(0)
  const [finalPrice, setFinalPrice] = useState(0)

  const getSupplierCosts = supplierData => {
    return parseToFloat(
      supplierData.reduce((sum, item) => {
        return sum + item.priceNetto
      }, 0)
    )
  }

  const getFixedCosts = fixedCostsData => {
    return parseToFloat(
      fixedCostsData.reduce((sum, item) => {
        return sum + (item.priceNetto + item.seasonalFee)
      }, 0)
    )
  }

  const getPercentageFeesCosts = percentageFeesData => {
    return parseToFloat(
      percentageFeesData.reduce((sum, item) => {
        return sum + item[`value (%)`]
      }, 0)
    )
  }

  useEffect(() => {
    setSupplierCosts(getSupplierCosts(supplierData))
  }, supplierData)

  useEffect(() => {
    setFixedCosts(getFixedCosts(fixedCostsData))
  }, fixedCostsData)

  useEffect(() => {
    setPercentageFees(getPercentageFeesCosts(percentageFeesData))
  }, percentageFeesData)

  const convertToEuro = value => value * euroCurrency

  const addFinalPriceFees = (priceBrutto, percentageFees) => {
    const percentageToNumber = (100 - percentageFees) / 100
    return priceBrutto / percentageToNumber
  }

  const applyVat = (priceNetto, vat) => {
    return priceNetto + (priceNetto * vat) / 100
  }

  /**
   * Calculates the final price of a product.
   * Aby obliczyć finalną cenę należy zachować kolejność obliczeń
   * Cena sprzedaży netto i na to naliczamy VAT
   * Do ceny końcowej doliczamy ryczałt i prowizje ebay (percentageFees)
   *
   * @returns {number} The final price in euros.
   */
  const getFinalPrice = () => {
    const priceNetto = supplierCosts + fixedCosts + price + profit
    const priceBrutto = applyVat(priceNetto, VAT_DE)
    const finalPrice = addFinalPriceFees(priceBrutto, percentageFees)

    return convertToEuro(finalPrice)
  }

  useEffect(() => {
    setFinalPrice(getFinalPrice())
  }, [supplierCosts, fixedCosts, percentageFees, euroCurrency, price, profit])

  const handleChange = event => {
    switch (event.target.name) {
      case "price":
        // todo sprawdzić czy potrzebujemy parseFloat
        setPrice(parseFloat(event.target.value || 0))
        break
      case "profit":
        setProfit(parseFloat(event.target.value || 0))
        break
      case "supplier-costs":
        setSupplierCosts(parseFloat(event.target.value || 0))
        break
      case "fixed-costs":
        setFixedCosts(parseFloat(event.target.value || 0))
        break
      case "percentage-fees":
        setPercentageFees(parseFloat(event.target.value || 0))
        break
      case "euro-currency":
        setEuroCurrency(parseFloat(event.target.value || 0))
        break
      default:
        break
    }
  }

  return (
    <div className="epc-calculator">
      <label htmlFor="euro-currency">Kurs EURO do PLN </label>
      <input
        id="euro-currency"
        name="euro-currency"
        type="number"
        value={euroCurrency}
        onChange={handleChange}
      />
      <br />
      <label htmlFor="supplier-costs">Koszty dostawcy (excel) </label>
      <input
        id="supplier-costs"
        name="supplier-costs"
        type="number"
        value={supplierCosts}
        onChange={handleChange}
      />
      <span> zł</span>
      <br />
      <label htmlFor="fixed-costs">Koszty stałe (excel) </label>
      <input
        id="fixed-costs"
        name="fixed-costs"
        type="number"
        value={fixedCosts}
        onChange={handleChange}
      />
      <span> zł</span>
      <br />
      <label htmlFor="percentage-fees">
        Koszty procentowe od sprzedaży (excel)
      </label>
      <input
        id="percentage-fees"
        name="percentage-fees"
        type="number"
        min="1"
        max="100"
        value={percentageFees}
        onChange={handleChange}
      />
      <span> %</span>
      <br />
      <form>
        <label className="epc-calculator__label--blue" htmlFor="price">
          Cena zakupu{" "}
        </label>
        <input
          id="price"
          type="number"
          name="price"
          placeholder="Cena zakupu"
          value={price}
          onChange={handleChange}
        />
        <span> zł</span>
        <br />
        <label className="epc-calculator__label--blue" htmlFor="profit">
          Oczekiwany zysk{" "}
        </label>
        <input
          id="profit"
          type="number"
          name="profit"
          placeholder="Oczekiwany zysk"
          value={profit}
          onChange={handleChange}
        />
        <span> zł</span>
        <br />
        <br />
        <label htmlFor="finalPrice">Cena końcowa </label>
        <input
          id="finalPrice"
          type="number"
          name="finalPrice"
          placeholder="Cena końcowa"
          value={finalPrice}
          readOnly
        />
        <span> EURO</span>
      </form>
    </div>
  )
}

export default ProfitCalculator
