const apiClient = {
  headers: { Accept: "text/csv" },
  baseUrl: process.env.API_URL,

  async get(url) {
    const apiUrl = new URL(`${this.baseUrl}/${url}`)
    // console.log(this.baseUrl, "color: #ffac40")

    // const apiUrl = new URL(`https://zesty-griffin-ec1b47.netlify.app//dasa`)

    return await fetch(apiUrl, { headers: this.headers })
  },
}

export default apiClient
