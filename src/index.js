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
var commentsDiv;
var commentUser;
var thisCommentInput;
var openCommentButton;
var count;
var countTwo;
var postNewCommentButton;
var newCommentInputBox;
var response;


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
  loadUsers()
  loadPosts()
  // loadComments()
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

      localStorage.setItem("user_id", `${user.id}`)
      localStorage.setItem("username", `${user.username}`)
      signOut.style.display = "unset"
      displayForModals()
    }
  })
  existingUser.value = ""
}

function displayForModals(){
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
        // appendUserToHTML(json)
        loadNewUser(json)
      }
    })
  }

//////////////////////////////////////////////////////////////////////////////

function loadPosts(){
  fetch('http://localhost:3000/api/v1/posts').then(res => res.json())
  .then(json => postUsers(json))
}

function postUsers(json){
  count = 0
  countTwo = 1
  allPosts = json
  userForPost = document.getElementById("userForPost")
  allPosts.forEach(function(post){

    count += 2
    countTwo += 2
    posts.insertAdjacentHTML("afterbegin", `<li id='${post.id}' class='post-element'> @${post.user.username}: ${post.content}
    <form class="commentForm">
      <input data-id=${post.id} class="commentButtonForEventlistener" id="commentCount${count}" type="submit" value="Comment">
        <input id="commentInput${countTwo}" type="text" >
    </form>
    <ul id="a${post.id}"></ul> </li>`)
    newCommentInputBox = document.getElementById(`${countTwo}`)
    post.comments.map(function(comment){
        document.getElementById(`${post.id}`).innerHTML += `<li class="comment">@${comment.username}: ${comment.content}</li>`
      })
    })
    applyEventListeners()
}

function applyEventListeners(){
  postNewCommentButtons = document.getElementsByClassName("commentButtonForEventlistener")
  for (var i = 0; i < postNewCommentButtons.length; i++){
    postNewCommentButtons[i].addEventListener("click", getCommentInput)
  }
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
      if (resp.ok){
        response = resp.json()
      } else {
        response = false
      }
      return response
    })
    .then(function(json){
      if (json){
        appendPostToHTML(json)
      }
    })
  }

  function appendPostToHTML(json) {
    inputBox.value = ""
    posts.insertAdjacentHTML("afterbegin", `<li data-userid='${json.id}' class='post-element'> @${localStorage.username}: ${json.content} <form class="commentForm">
      <input data-id=${post.id} id=${count} type="submit" value="Comment">
        <input id=${countTwo + 2} type="text" >
    </form>
    <ul id="a${post.id}"></ul> </li>`)
}

//////////////////////////////////////////////////////////////////////////////

function loadComments(){

  fetch('http://localhost:3000/api/v1/comments').then(res => res.json())
  .then(json => comments(json))
}

function comments(json){

  allComments = json
  userForComment = document.getElementById("userForPost")

  allComments.forEach(function(comment){
        commentsDiv.insertAdjacentHTML("afterbegin", `<li data-userid='${comment.id}' class='comment-element'> ${comment.user.username}: ${comment.content} </li>`)
  })
}

function getCommentInput(e) {
  e.preventDefault();
  debugger;
  thisCommentInput = document.getElementById(`${this.nextElementSibling.id}`);
  var input = thisCommentInput.value
  var thisCommentUsername = localStorage.username
  var userID = parseInt(localStorage.user_id)
  var postID = parseInt(e.target.dataset.id)
  const body = {content: input, user_id: userID, post_id: postID}
  // createComment(body)
  debugger;
  postNewComment(body)
}

// function createComment(body){
//   console.log(body)
//   comment = new Comment(body)
// }

function postNewComment(matt) {
  debugger;
    fetch('http://localhost:3000/api/v1/comments', {
      method: 'POST',
      headers: {
        'Content-Type':'application/json'
      },
      body: JSON.stringify(matt)
    }).then(resp => {
      if (resp.ok){
        response = resp.json()
      } else {
        response = false
      }
      return response
    })
    .then(function(json){
      if (json){
        debugger;
        appendCommentToHTML(json)
      }
    })
  }


function appendCommentToHTML(json){
  debugger;
  var commentInsert = document.getElementById(`a${json.post_id}`)
  commentInsert.insertAdjacentHTML("afterbegin", `<li data-userid='hhh${json.id}' class="comment"> @${localStorage.username}: ${json.content}  </li>`)
}


const adap = new UsersAdapter()
