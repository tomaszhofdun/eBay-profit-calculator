import apiClient from "../../../api/apiClient"
import { FixedCostsModel } from "../../../models/query/costs/FixedCostsModel"
import { parseFile } from "../../../helpers/parseFile"
import { useQuery } from "react-query"

const useFixedCostsQuery = () => {
  return useQuery(["fixed-costs"], async () => {
    const response = await apiClient.get("./fixed-costs.xlsx")
    const parsedData = parseFile(await response.arrayBuffer())

    return new FixedCostsModel(parsedData)
  })
}

export default useFixedCostsQuery
