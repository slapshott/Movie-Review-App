import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router, ActivatedRoute } from '@angular/router'

import { MoviesService } from '../../service/movies.service'
import { ReviewsService } from '../../service/reviews.service'
import { AuthenticationService } from 'app/service/authentication.service';


@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {

  starsCount: number
  reviewForm: FormGroup
  movie: Object
  reviews: Array<any>
  reviewContent: string
  
  reviewToEditId: string
  reviewToEdit

  constructor(
    private formBuilder: FormBuilder,
    private moviesService: MoviesService,
    private router: ActivatedRoute,
    private reviewsService: ReviewsService,
    private auth: AuthenticationService
  ) { }

  ngOnInit() {
    this.router.params.subscribe(params => {
      let id = params['movieId']
      this.loadReview(id)
    })
  }

  addReview() {
    let movieId = this.movie['id']
  
    this.reviewsService.addNewReview(this.starsCount, this.reviewContent, this.movie).subscribe(res => {
      this.loadReview(movieId)
      this.reviewContent = ''
    })
  }

  deleteReview(id){
    this.reviewsService.deleteReview(id).subscribe(res => {
      if(res.status === 200){
       let index = this.reviews.findIndex(review => review._id = id)
       this.reviews.splice(index, 1)
      }
    })
  }

  editReview(id){
    this.reviewToEditId = id;
    this.reviewToEdit = this.reviews.find(review => review._id === id)
  }

  changeReviewContent(event: any){
    this.reviewToEdit.content = event.target.value
  }

  sendEditReview(){
    this.reviewsService.editReview(this.reviewToEdit).subscribe(res => {
      this.reviewToEdit = '';
      this.reviewToEditId = '';
    })
  }


  loadReview(id){
    this.moviesService.getMovie(id).subscribe(movie => this.movie = movie)
    this.reviewsService
      .getAllReviews(id)
      .subscribe(review =>{this.reviews = review}) 
  }
}
