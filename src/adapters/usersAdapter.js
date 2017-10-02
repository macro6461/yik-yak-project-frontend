class UsersAdapter {
  constructor() {
    this.baseUrl = 'http://localhost:3000/api/v1/users'
  }

  getUsers() {
    debugger
    fetch(this.baseUrl).then(response => response.json())
  }

  createUser(body) {
    debugger
    const userCreateParams = {
      method: 'POST',
      headers: {
        'Content-Type':'application/json'
      },
      body: JSON.stringify(body)
    }
    return fetch(this.baseUrl, userCreateParams).then(resp => resp.json())
  }

}
