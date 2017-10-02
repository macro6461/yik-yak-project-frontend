document.addEventListener('DOMContentLoaded', function(){
  var usersForm = document.getElementById('new-user-form')
  var submitButton = document.getElementById('submit')
  submitButton.addEventListener('click', handleAddUser)
  loadUsers()
})

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
  debugger;
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
  postNewUser(user)
}

function createUser(body) {
  console.log(body)
  user = new User(body)
  // user.name = body.name
  // user.username = body.username
  // user.email = body.email
  return user
}

  function render(json) {
    debugger;
    results = json
    usersContainer = document.getElementById("users-container")
      results.forEach(function(user){
        usersContainer.innerHTML += `<li data-userid='${user.id}' class='user-element'> ${user.username} <i data-action='delete-user' class="em em-scream_cat"></i></li>`
      })
  }


function postNewUser(user) {
  var body = user.body
    const userCreateParams = {
      method: 'POST',
      headers: {
        'Content-Type':'application/json'
      },
      body: JSON.stringify(body)
    }
    debugger
    fetch('http://localhost:3000/api/v1/users', userCreateParams).then(resp => resp.json())
    .then(function(){
      if ((fetch('http://localhost:3000/api/v1/users', userCreateParams).then(resp => resp.json())).ok){
        retreiveData.then(appendToHTML(user))
        retreiveData.then(loadNewUser(user))
      } else {
        personName.value = ""
        username.value = ""
        email.value = ""
        throw "What are you doing you lunatic"
      }
    })
  }

  function appendToHTML(user) {
    usersContainer.innerHTML += `<li data-userid='${user.body.id}' class='user-element'> ${user.body.username} <i data-action='delete-user' class="em em-scream_cat"></i></li>`
  }

const adap = new UsersAdapter()
