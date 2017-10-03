var signUpModal;
var signInModal;
var errorDiv;
var user;
var baseUrl;
var personName;
var email;
var username;
var results;
var usersContainer;
var existingUser;
var inOrUp;


document.addEventListener('DOMContentLoaded', function(){
  inOrUp = document.getElementById('inOrUp')
  var newUserForm = document.getElementById('new-user-form')
  var existingUserForm = document.getElementById('existing-user-form')
  var newUserSubmitButton = document.getElementById('signUpSubmit')
  var existingUserSubmitButton = document.getElementById('signInSubmit')
  signUpModal = document.getElementById("signUpModal")
  signInModal = document.getElementById("signInModal")
  var signUpButton = document.getElementById('signUp')
  var signInButton = document.getElementById('signIn')
  signInButton.addEventListener('click', signIn)
  signUpButton.addEventListener('click', signUp)
  newUserSubmitButton.addEventListener('click', handleAddUser)
  existingUserSubmitButton.addEventListener('click', findUser)
  loadUsers()
})

function signIn(e){
  e.preventDefault()
  signInModal.style.display = "unset"
}

function signUp(e){
  e.preventDefault()
  signUpModal.style.display = "unset"
}

function loadNewUser(){
  debugger;
  results[results.length - 1];
  personName.value = ""
  email.value = ""
  username.value = ""
  hello.innerHTML = `Hello ${user.body.username}!`
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

function findUser(e){
  e.preventDefault()
  debugger;
  var signOut = document.getElementById("signOut")
  signOut.addEventListener("click", deleteSession)
  existingUser = document.getElementById("existing-username")
  var hello = document.getElementById("hello")
  fetch("http://localhost:3000/api/v1/sessions").then(res => res.json())
  .then(json => findRender(json))
  debugger;
  results.find(function(result){
    if (result.username === existingUser.value){
      console.log(result)
      hello.innerHTML = `Hello ${result.username}!`
      localStorage.setItem("username",  `${result.username}`)
      signUpModal.style.display = "none"
      signInModal.style.display = "none"
      inOrUp.style.display = "none"
      signOut.style.display = "unset"
      debugger;
    }

  })
}

function deleteSession(e){
  debugger;
  e.preventDefault()
  localStorage.removeItem("username")
  hello.innerHTML = ""
  signOut.style.display = "none"
}

function handleAddUser(e) {
  debugger;
  e.preventDefault()
  const body = {name: personName.value, username: username.value, email: email.value}
  if (findUser()){
    console.log(user)
  } else {
    createUser(body)
    debugger;
    document.cookie = `username=${user.username}`
    postNewUser(user)
  }
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

  function findRender(json) {
    results = json
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
    fetch('http://localhost:3000/api/v1/users', userCreateParams).then(resp => {
      if (resp.ok){
        return resp.json()
      } else {
        debugger;
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
