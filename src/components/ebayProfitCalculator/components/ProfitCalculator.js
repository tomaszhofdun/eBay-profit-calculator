import React, { useState, useEffect } from "react"
import { parseToFloat } from "../../../helpers/parseNumbers"
import {
  AbsoluteCenter,
  Box,
  Button,
  Divider,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  InputRightElement,
} from "@chakra-ui/react"

const ProfitCalculator = ({
  data: { supplierData, fixedCostsData, percentageFeesData },
}) => {
  const VAT_DE = 19 // VAT DE 19%
  const [supplierCosts, setSupplierCosts] = useState(0)
  const [fixedCosts, setFixedCosts] = useState(0)
  const [percentageFees, setPercentageFees] = useState(0)
  const [euroCurrency, setEuroCurrency] = useState(0.23)
  const [price, setPrice] = useState("")
  const [profit, setProfit] = useState("")
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
    const priceNetto =
      (supplierCosts || 0) + (fixedCosts || 0) + (price || 0) + (profit || 0)

    const priceBrutto = applyVat(priceNetto, VAT_DE)
    const finalPrice = addFinalPriceFees(priceBrutto, percentageFees || 0)

    return convertToEuro(finalPrice)
  }

  useEffect(() => {
    setFinalPrice(getFinalPrice())
  }, [supplierCosts, fixedCosts, percentageFees, euroCurrency, price, profit])

  const handleChange = event => {
    switch (event.target.name) {
      case "price":
        setPrice(parseFloat(event.target.value))
        break
      case "profit":
        setProfit(parseFloat(event.target.value))
        break
      case "supplier-costs":
        setSupplierCosts(parseFloat(event.target.value))
        break
      case "fixed-costs":
        setFixedCosts(parseFloat(event.target.value))
        break
      case "percentage-fees":
        setPercentageFees(parseFloat(event.target.value))
        break
      case "euro-currency":
        setEuroCurrency(parseFloat(event.target.value))
        break
      default:
        break
    }
  }

  return (
    <div className="epc-calculator">
      <InputGroup pb={5}>
        <InputLeftAddon children="Kurs EURO do PLN " />
        <Input
          id="euro-currency"
          name="euro-currency"
          type="number"
          value={euroCurrency || 0}
          onChange={handleChange}
        />
      </InputGroup>

      <InputGroup>
        <InputLeftAddon children="Koszty dostawcy (excel) " />
        <Input
          pr="4.5rem"
          id="supplier-costs"
          name="supplier-costs"
          type="number"
          value={supplierCosts || 0}
          onChange={handleChange}
        />
        <InputRightElement width="4.5rem">
          <Button
            href="/suppliers.xlsx"
            as="a"
            target="_blank"
            h="1.75rem"
            size="sm"
            right={50}
            bgColor={"green.300"}
          >
            Excel
          </Button>
        </InputRightElement>
        <InputRightAddon children="zł" />
      </InputGroup>

      <InputGroup>
        <InputLeftAddon children="Koszty stałe (excel) " />
        <Input
          id="fixed-costs"
          name="fixed-costs"
          type="number"
          value={fixedCosts || 0}
          onChange={handleChange}
        />
        <InputRightElement width="4.5rem">
          <Button
            href="/fixed-costs.xlsx"
            as="a"
            target="_blank"
            h="1.75rem"
            size="sm"
            right={50}
            bgColor={"green.300"}
          >
            Excel
          </Button>
        </InputRightElement>
        <InputRightAddon children="zł" />
      </InputGroup>

      <InputGroup pb={5}>
        <InputLeftAddon children="Koszty procentowe od sprzedaży (excel)" />
        <Input
          id="percentage-fees"
          name="percentage-fees"
          type="number"
          min="1"
          max="100"
          value={percentageFees || 0}
          onChange={handleChange}
        />
        <InputRightElement width="4.5rem">
          <Button
            href="/percentage-fees.xlsx"
            as="a"
            target="_blank"
            h="1.75rem"
            size="sm"
            right={50}
            bgColor={"green.300"}
          >
            Excel
          </Button>
        </InputRightElement>
        <InputRightAddon children="%" />
      </InputGroup>

      <InputGroup>
        <InputLeftAddon children="Cena zakupu (netto)" />
        <Input
          id="price"
          type="number"
          name="price"
          placeholder="Cena zakupu"
          value={price}
          onChange={handleChange}
        />
        <InputRightAddon children="zł" />
      </InputGroup>

      <InputGroup pb={5}>
        <InputLeftAddon children="Oczekiwany zysk (netto)" />
        <Input
          id="profit"
          type="number"
          name="profit"
          placeholder="Oczekiwany zysk"
          value={profit}
          onChange={handleChange}
        />
        <InputRightAddon children="zł" />
      </InputGroup>

      <Box position="relative" padding="10">
        <Divider mb={5} />
        <AbsoluteCenter bg="white" px="4">
          Wynik poniżej
        </AbsoluteCenter>
      </Box>

      <InputGroup>
        <InputLeftAddon children="Cena końcowa" />
        <Input
          id="finalPrice"
          type="number"
          name="finalPrice"
          placeholder="Cena końcowa"
          value={finalPrice || 0}
          readOnly
          focusBorderColor="red.400"
          variant="filled"
        />
        <InputRightAddon children="EURO" />
      </InputGroup>
    </div>
  )
}

export default ProfitCalculator
