class UsersAdapter {
  constructor() {
    this.baseUrl = 'https://postd-backend.herokuapp.com/api/v1/users'
  }

  getUsers() {
    fetch(this.baseUrl).then(response => response.json())
  }

  createUser(body) {
    debugger;
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
