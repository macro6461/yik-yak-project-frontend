class Comment{

  constructor(commentJSON){
      this.body = commentJSON
      this.id = commentJSON.id
  }

  fetchAndLoadComments(results) {
    this.adapter.getComments()
    .then( commentsJSON => commentsJSON.forEach(function(comment){ this.comments.push( new Comment(comment) )}))
      .then( this.render.bind(this) )
      .catch( (error) => console.log(error) )
  }

}
