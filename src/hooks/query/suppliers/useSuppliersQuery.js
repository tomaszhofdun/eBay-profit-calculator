import apiClient from "../../../api/apiClient"
import { SuppliersModel } from "../../../models/query/suppliers/SuppliersModel"
import { parseFile } from "../../../helpers/parseFile"
import { useQuery } from "react-query"

const useSuppliersQuery = () => {
  return useQuery(["suppliers"], async () => {
    const response = await apiClient.get("./suppliers.xlsx")
    const parsedData = parseFile(await response.arrayBuffer())

    return new SuppliersModel(parsedData)
  })
}

export default useSuppliersQuery
