import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'

import { MoviesService } from '../../service/movies.service'
import { ReviewsService } from '../../service/reviews.service'
import { AuthenticationService } from '../../service/authentication.service'
import { CommentsService } from 'app/service/comments.service';


@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {

  movie: Object
  comments: Array<any>
  newComment: string

  constructor(
    private router: ActivatedRoute,
    private moviesService: MoviesService,
    private auth: AuthenticationService,
    private commentsService: CommentsService
  ) { }

  ngOnInit() {
    this.router.params.subscribe(params => {
      let id = params['id']
      this.loadComments(id)
    })
  }

  addComment() {
    let movieId = this.movie['id']
    this.commentsService.addNewComment(this.newComment, movieId).subscribe(res => {
      this.loadComments(movieId)
      this.newComment = ''
    })

  }

  loadComments(id) {
    this.moviesService.getMovie(id).subscribe(movie => this.movie = movie)
    this.commentsService
      .getAllComments(id)
      .subscribe(comments => {
      this.comments = comments
      // comments.forEach(comment => {
      //   console.log(comment._id)
      // });
    })
  }

  deleteComment(){
    let movieId = this.movie['id']
    this.commentsService.getAllComments(movieId).subscribe(comment => {
      let id = comment[0]['_id']
      console.log(id)
      this.commentsService.deleteComment(id)
    })
    
  }

  editComment(){
    let comment 
    let movieId
    let commentId
    this.commentsService.editComment(comment, movieId, commentId)
  }

}
