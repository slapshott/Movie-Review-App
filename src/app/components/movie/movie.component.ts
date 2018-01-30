import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'

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

  commentToEditId
  commentToEdit

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
      })
  }

  deleteComment(id) {
    this.commentsService.deleteComment(id).subscribe(res => {
      if (res.status === 200) {
        let index = this.comments.findIndex(comment => comment._id === id);
        this.comments.splice(index, 1);
      }
    })
  }

  editComment(id: string) {
    this.commentToEditId = id;
    this.commentToEdit = this.comments.find(comment => comment._id === id);
  }

  changeCommentContent(event: any) {
    this.commentToEdit.comment = event.target.value;
  }

  sendEditComment() {
    this.commentsService.editComment(this.commentToEdit).subscribe(res => {
      this.commentToEdit = '';
      this.commentToEditId = '';
    });
  }
}
