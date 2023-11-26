const apiClient = {
  headers: { Accept: "text/csv" },
  baseUrl: process.env.REACT_APP_API_URL,

  async get(url) {
    const apiUrl = new URL(`${this.baseUrl}/${url}`)

    return await fetch(apiUrl, { headers: this.headers })
  },
}

export default apiClient
