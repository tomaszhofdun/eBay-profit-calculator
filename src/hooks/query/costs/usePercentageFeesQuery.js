import apiClient from "../../../api/apiClient"
import { PercentageFeesModel } from "../../../models/query/costs/PercentageFeesModel"
import { parseFile } from "../../../helpers/parseFile"
import { useQuery } from "react-query"

const usePercentageFeesQuery = () => {
  return useQuery(["percentage-fees"], async () => {
    const response = await apiClient.get("./percentage-fees.xlsx")
    const parsedData = parseFile(await response.arrayBuffer())

    return new PercentageFeesModel(parsedData)
  })
}

export default usePercentageFeesQuery
