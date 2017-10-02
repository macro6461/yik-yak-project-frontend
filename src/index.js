document.addEventListener('DOMContentLoaded', function(){
  var usersForm = document.getElementById('new-user-form')
  var submitButton = document.getElementById('submit')
  submitButton.addEventListener('click', handleAddUser)

  var baseUrl = 'http://localhost:3000/api/v1/users'
  fetch(baseUrl).then(res => res.json())
  .then(json => render(json))
  debugger;
})



var user;
var baseUrl;

function handleAddUser(e) {
  e.preventDefault()
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
  user = new User(body)
  // user.name = body.name
  // user.username = body.username
  // user.email = body.email
  return user
}

  function render(json) {
    var usersContainer = document.getElementById("users-container")
    json.forEach(function(user){
      usersContainer.innerHTML += `<li data-userid='${user.id}' class='user-element'> ${user.username} <i data-action='delete-user' class="em em-scream_cat"></i></li>`
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
