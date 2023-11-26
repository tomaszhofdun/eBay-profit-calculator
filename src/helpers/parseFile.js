import * as XLSX from "xlsx"

export function parseFile(data) {
  const workbook = XLSX.read(data, { type: "array" })
  const sheetNames = workbook.SheetNames
  const parsedData = sheetNames.map(sheetName => {
    const sheet = workbook.Sheets[sheetName]
    const data = XLSX.utils.sheet_to_json(sheet, { header: 2 })
    return {
      sheetName: sheetName,
      data: data,
    }
  })

  return parsedData
}
