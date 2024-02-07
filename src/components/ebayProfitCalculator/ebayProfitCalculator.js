import * as React from "react"
import useSuppliersQuery from "../../hooks/query/suppliers/useSuppliersQuery"
import useFixedCostsQuery from "../../hooks/query/costs/useFixedCostsQuery"
import usePercentageFeesQuery from "../../hooks/query/costs/usePercentageFeesQuery"
import SupplierTabs from "./SupplierTabs/SupplierTabs"
import Aio from "./components/Aio"
import Polcar from "./components/Polcar"

const EbayProfitCalculator = () => {
  const { isSupplierDataLoading, data: supplierData } = useSuppliersQuery()
  const { isFixedCostsDataLoading, data: fixedCostsData } = useFixedCostsQuery()
  const { isPercentageFeesDataLoading, data: percentageFeesData } =
    usePercentageFeesQuery()

  if (
    isSupplierDataLoading ||
    !supplierData ||
    isFixedCostsDataLoading ||
    !fixedCostsData ||
    isPercentageFeesDataLoading ||
    !percentageFeesData
  ) {
    return null
  }

  const aioData = {
    supplierData: supplierData.aio,
    fixedCostsData: fixedCostsData.aio,
    percentageFeesData: percentageFeesData.aio,
    collectionAddress:
      "AIO FACTORY Sp. Z O. O. Ul. Żwirki i Wigury 15 Hala nr 7A 38-400 Krosno",
  }

  const polcarData = {
    supplierData: supplierData.polcar,
    fixedCostsData: fixedCostsData.polcar,
    percentageFeesData: percentageFeesData.polcar,
  }

  const items = [
    {
      label: "aio",
      children: <Aio data={aioData} />,
    },
    {
      label: "polcar",
      children: <Polcar data={polcarData} />,
    },
  ]
  return <SupplierTabs items={items} />
}

export default EbayProfitCalculator
