class Post{

  constructor(postJSON){
      this.body = postJSON
      this.id = postJSON.id
  }

  fetchAndLoadPosts(results) {
    this.adapter.getPosts()
    .then( postsJSON => postsJSON.forEach(function(post){ this.posts.push( new Post(post) )}))
      .then( this.render.bind(this) )
      .catch( (error) => console.log(error) )
  }

}
