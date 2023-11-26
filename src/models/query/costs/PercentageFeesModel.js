export class PercentageFeesModel {
  constructor(data) {
    this.data = data

    this.sheetNames = {
      aio: "aio",
      polcar: "polcar",
    }
  }

  getSheetData(sheetName) {
    return this.data?.find(item => item.sheetName === sheetName)?.data ?? false
  }

  get aio() {
    return this.getSheetData(this.sheetNames.aio)
  }

  get polcar() {
    return this.getSheetData(this.sheetNames.polcar)
  }
}
