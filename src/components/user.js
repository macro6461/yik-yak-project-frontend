class User {
  constructor(userJSON) {
    this.body = userJSON
    this.id = userJSON.id
  }

  fetchAndLoadUsers(results) {
    this.adapter.getUsers()
    .then( usersJSON => usersJSON.forEach(function(user){ this.users.push( new User(user) )}))
      .then( this.render.bind(this) )
      .catch( (error) => console.log(error) )
  }

  usersHTML() {
    return this.users.map( user => user.render() ).join('')
  }

  render() {
    this.usersNode.innerHTML = `<ul>${this.usersHTML()}</ul>`
  }

  render() {
    return `<li data-userid='${this.id}' data-props='${JSON.stringify(this)}' class='user-element'>${this.body} <i data-action='delete-user' class="em em-scream_cat"></i></li>`
  }
}
