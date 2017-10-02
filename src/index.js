document.addEventListener('DOMContentLoaded', function(){
  var baseUrl = 'http://localhost:3000/api/v1/users'
  fetch(baseUrl).then(res => res.json())
  .then(json => initBindingsAndEventListeners(json))
})

function initBindingsAndEventListeners(json){
  var results = json
  User.all = results
  var usersForm = document.getElementById('new-user-form')
  debugger;
  usersForm.addEventListener('submit', handleAddUser())
  fetchAndLoadUsers(results)
}

function handleAddUser() {
  var name = document.getElementById('new-user-form').name
  debugger;
  var username = document.getElementById('username')
  var email = document.getElementById('email')
  const body = {name: name.value, username: username.value, email: email.value}
  debugger;
  createUser(body)
  .then(user => User.all.push(user) )
  .then( () => name.value = '' )
  .then( () => username.value = '' )
  .then( () => email.value = '' )
}

function createUser(body) {
  console.log(body)
  debugger;
  var user = new User({body})
  // user.name = body.name
  // user.username = body.username
  // user.email = body.email
}

const adap = new UsersAdapter()
