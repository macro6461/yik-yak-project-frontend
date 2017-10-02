document.addEventListener('DOMContentLoaded', function(){
  var baseUrl = 'http://localhost:3000/api/v1/users'
  debugger;
  fetch(baseUrl).then(res => res.json())
  .then(json => render(json))
  .then(json => initBindingsAndEventListeners(json))
})

var user;
var baseUrl;

function initBindingsAndEventListeners(json){
  var results = json
  User.all = results
  var usersForm = document.getElementById('new-user-form')
  debugger;
  usersForm.addEventListener('submit', handleAddUser())
}

function handleAddUser() {
  var name = document.getElementById('new-user-form').name
  debugger;
  var username = document.getElementById('username')
  var email = document.getElementById('email')
  const body = {name: name.value, username: username.value, email: email.value}
  debugger;
  createUser(body)
  postNewUser(user)
}

function createUser(body) {
  console.log(body)
  debugger;
  user = new User({body})
  // user.name = body.name
  // user.username = body.username
  // user.email = body.email
  return user
}

  function render(json) {
    var usersContainer = document.getElementById("users-container")
    debugger;
    json.forEach(function(user){
      usersContainer.innerHTML += `<li data-userid='${user.id}' class='user-element'> ${user.username} <i data-action='delete-user' class="em em-scream_cat"></i></li>`
      debugger;
    })
  }


function postNewUser(user) {
  var body = user.body
  debugger;
    const userCreateParams = {
      method: 'POST',
      headers: {
        'Content-Type':'application/json'
      },
      body: JSON.stringify(body)
    }
    return fetch('http://localhost:3000/api/v1/users', userCreateParams).then(resp => resp.json())
  }

const adap = new UsersAdapter()
