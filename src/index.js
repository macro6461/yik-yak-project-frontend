document.addEventListener('DOMContentLoaded', function(){
  var usersForm = document.getElementById('new-user-form')
  var submitButton = document.getElementById('submit')
  submitButton.addEventListener('click', handleAddUser)
  loadUsers()
})

var errorDiv;
var user;
var baseUrl;
var personName;
var email;
var username;
var results;
var usersContainer;

function loadNewUser(){
  results[results.length - 1];
  personName.value = ""
  email.value = ""
  username.value = ""
}

function loadUsers(){
  personName = document.getElementById('person-name')
  username = document.getElementById('username')
  email = document.getElementById('email')
  baseUrl = 'http://localhost:3000/api/v1/users'
  fetch(baseUrl).then(res => res.json())
  .then(json => render(json))
  personName.value = ""
  email.value = ""
  username.value = ""
}

function handleAddUser(e) {
  e.preventDefault()
  const body = {name: personName.value, username: username.value, email: email.value}
  createUser(body)
  debugger;
  document.cookie = `username=${user.username}`
  postNewUser(user)
}

function createUser(body) {
  debugger
  console.log(body)
  user = new User(body)
  // user.name = body.name
  // user.username = body.username
  // user.email = body.email
  return user
}

  function render(json) {
    results = json
    usersContainer = document.getElementById("users-container")
      results.forEach(function(user){
        usersContainer.innerHTML += `<li data-userid='${user.id}' class='user-element'> ${user.username} <i data-action='delete-user' class="em em-scream_cat"></i></li>`
      })
  }


function postNewUser(user) {
  errorDiv = document.getElementById("throwError")
  var body = user.body
    const userCreateParams = {
      method: 'POST',
      headers: {
        'Content-Type':'application/json'
      },
      body: JSON.stringify(body)
    }
    fetch('http://localhost:3000/api/v1/users', userCreateParams).then(resp => {
      if (resp.ok){
        return resp.json()
      } else {
        debugger;
        errorDiv.innerHTML = `<h1>Username is already taken.</h1>`
        return false
      }
    })
    .then(function(json){
      if (json){
        appendToHTML(json)
        loadNewUser(json)
      }
    })
    personName.value = ""
    username.value = ""
    email.value = ""
  }

  function appendToHTML(json) {
    debugger;
    usersContainer.innerHTML += `<li data-userid='${json.id}' class='user-element'> ${json.username} <i data-action='delete-user' class="em em-scream_cat"></i></li>`
  }



const adap = new UsersAdapter()
