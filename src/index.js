var signUpModal;
var signInModal;
var errorDiv;
var user;
var post;
var baseUrl;
var personName;
var email;
var username;
var allUsers;
var allPosts;
var usersContainer;
var existingUser;
var inOrUp;
var posts;
var inputBox;
var userForPost;
var sortedPosts;
var postSubmitButton;
var title;
var newPost;


document.addEventListener('DOMContentLoaded', function(){
  var signOut = document.getElementById("signOut")
  signOut.addEventListener("click", deleteSession)
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
  postSubmitButton = document.getElementById('postSubmit');
  postSubmit.addEventListener("click", getPostInput);
  posts = document.getElementById("posts")
  title = document.getElementById("title")
  newPost = document.getElementById("newPost")
  displayForModals()
  loadPosts()
  loadUsers()
  // postUsers()
})

function signIn(e){
  e.preventDefault()
  inOrUp.style.display = "none"
  signInModal.style.display = "unset"
}

function signUp(e){
  e.preventDefault()
  inOrUp.style.display = "none"
  signUpModal.style.display = "unset"
}

function loadNewUser(){
  debugger;
  allUsers[allUsers.length - 1]
  personName.value = ""
  email.value = ""
  username.value = ""
  displayForModals()
  hello.innerHTML = `Hello ${user.body.username}!`
}

function loadUsers(){
  personName = document.getElementById('person-name')
  username = document.getElementById('username')
  email = document.getElementById('email')
  baseUrl = 'http://localhost:3000/api/v1/users'
  fetch(baseUrl).then(res => res.json())
  .then(json => render(json))
}

function findUser(e){
  e.preventDefault()
  existingUser = document.getElementById("existing-username")
  var hello = document.getElementById("hello")
  fetch("http://localhost:3000/api/v1/sessions").then(res => res.json())
  .then(json => findRender(json))
  allUsers.find(function(user){
    if (user.username === existingUser.value){
      console.log(user)
      hello.innerHTML = `Hello ${user.username}!`
      debugger;
      localStorage.setItem("user_id", `${user.id}`)
      localStorage.setItem("username", `${user.username}`)
      signOut.style.display = "unset"
      displayForModals()
    }
  })
  existingUser.value = ""
}

function displayForModals(){
  debugger
  if (localStorage.length > 0){
    title.style.display = "unset"
    newPost.style.display = "unset"
    posts.style.display = "unset"
    signUpModal.style.display = "none"
    signInModal.style.display = "none"
    inOrUp.style.display = "none"
    signOut.style.display = "unset"
    hello.innerHTML = `Hello ${localStorage.username}!`
    postSubmitButton.style.display= "unset"
  } else {
    title.style.display = "none"
    newPost.style.display = "none"
    postSubmitButton.style.display= "none"
    inOrUp.style.display = "unset"
    signOut.style.display = "none"
    posts.style.display = "none"
  }
}

function deleteSession(e){
  e.preventDefault()
  localStorage.removeItem("user_id")
  localStorage.removeItem("username")
  hello.innerHTML = ""
  signOut.style.display = "none"
  displayForModals()
}

function handleAddUser(e) {

  e.preventDefault()
  const body = {name: personName.value, username: username.value, email: email.value}
  createUser(body)
  postNewUser(user)
}

function createUser(body) {
  user = new User(body)
  console.log(user)
}

  function render(json) {
    allUsers = json
    usersContainer = document.getElementById("users-container")
      allUsers.forEach(function(user){
        usersContainer.innerHTML += `<li data-userid='${user.id}' class='user-element'> ${user.username} <i data-action='delete-user' class="em em-scream_cat"></i></li>`
      })
  }

  function findRender(json) {
    allUsers = json
  }


function postNewUser(user) {
  debugger;
    var body = user.body
    const userCreateParams = {
      method: 'POST',
      headers: {
        'Content-Type':'application/json'
      },
      body: JSON.stringify(body)
    }
    fetch('http://localhost:3000/api/v1/users', userCreateParams).then(resp => {
      var response;
      if (resp.ok){
        response = resp.json()
      } else {
        response = false
      }
      return response
    })
    .then(function(json){
      if (json){
        localStorage.setItem("user_id", `${json.id}`)
        localStorage.setItem("username", `${json.username}`)
        appendUserToHTML(json)
        loadNewUser(json)
      }
    })
  }

  function appendUserToHTML(json) {
    debugger;
    usersContainer.innerHTML += `<li data-userid='${json.id}' class='user-element'> ${json.username} <i data-action='delete-user' class="em em-scream_cat"></i></li>`
  }

//////////////////////////////////////////////////////////////////////////////

function loadPosts(){
  debugger;
  fetch('http://localhost:3000/api/v1/posts').then(res => res.json())
  .then(json => postUsers(json))
}

function postUsers(json){
  debugger;
  allPosts = json
  userForPost = document.getElementById("userForPost")
  debugger;
  allPosts.forEach(function(post){
    debugger
    posts.insertAdjacentHTML("afterbegin", `<li data-userid='${json.id}' class='post-element'> ${post.user.username}: ${post.content} <i></i></li>`)
  })
}

function getPostInput(e) {
  e.preventDefault();
  inputBox = document.getElementById("content");
  var input = inputBox.value
  var userID = parseInt(localStorage.user_id)
  const body = {content: input, user_id: userID}
  createPost(body)
  postNewPost(post)
}

function createPost(body){
  console.log(body)
  post = new Post(body)
}

function postNewPost(post) {
    var body = post.body
    const postCreateParams = {
      method: 'POST',
      headers: {
        'Content-Type':'application/json'
      },
      body: JSON.stringify(body)
    }
    fetch('http://localhost:3000/api/v1/posts', postCreateParams).then(resp => {
      var response;
      if (resp.ok){
        response = resp.json()
      } else {
        response = false
      }
      return response
    })
    .then(function(json){
      debugger;
      if (json){
        appendPostToHTML(json)
      }
    })
  }

  function appendPostToHTML(json) {
    debugger;
    inputBox.value = ""
    posts.insertAdjacentHTML("afterbegin", `<li data-userid='${json.id}' class='post-element'> ${localStorage.username}: ${json.content} <i></i></li>`)
}

const adap = new UsersAdapter()
