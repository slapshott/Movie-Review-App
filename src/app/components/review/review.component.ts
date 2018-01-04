import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router, ActivatedRoute } from '@angular/router'

import { MoviesService } from '../../service/movies.service'
import { ReviewsService } from '../../service/reviews.service'


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

  constructor(
    private formBuilder: FormBuilder,
    private moviesService: MoviesService,
    private router: ActivatedRoute,
    private reviewsService: ReviewsService
  ) { }

  ngOnInit() {
    this.router.params.subscribe(params => {
      let id = params['movieId']
      this.moviesService.getMovie(id).subscribe(movie => this.movie = movie)
      this.loadReview(id)
    })
  }

  addReview() {
    // console.log(this.starsCount)
    // console.log(this.reviewContent)
    // console.log(this.movie)

    this.reviewsService.addReview(this.starsCount, this.reviewContent, this.movie)
  }

  loadReview(id){
    this.moviesService.getMovie(id).subscribe()
    this.reviewsService.getAllReviews(id)
    .subscribe(review =>{
      this.reviews = review
    }) 
  }
}
