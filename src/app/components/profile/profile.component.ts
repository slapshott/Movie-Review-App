import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AuthenticationService } from '../../service/authentication.service'
import { ProfileService } from '../../service/profile.service';
import { MoviesService } from 'app/service/movies.service';


@Component({
    selector: 'profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit{ 

    name:string;
    comments = []
    reviews = []

    constructor(
        private auth:AuthenticationService, 
        private movieService: MoviesService,
        private profileService: ProfileService,
        private router: ActivatedRoute
    ){
        this.name = auth.getLoggedInUser()
    }

    ngOnInit(){   
        this.loadUserComments()
        this.loadUserReviews()
    }

    loadUserComments(){
        let movieId;
        let user = this.auth.getLoggedInUser()
        this.profileService.getAllComments()
        .subscribe(res => {
            res.json().forEach(c => {  
                if(c.user.username === user){
                    movieId = c.movieId
                    let comment = {}
                    comment['comment'] = c.comment
                    comment['date'] = c._kmd
                    this.movieService.getMovie(movieId).subscribe(movie => comment['title'] = movie.title)
                    this.comments.push(comment)
                }      
            })
        }) 
    }

    loadUserReviews(){
        let movieId
        let user = this.auth.getLoggedInUser()
        this.profileService.getAllReviews()
        .subscribe(res => {
            console.log(res.json())
            res.json().forEach(r => {
                if(r.user.username === user){
                    movieId = r.movieId
                    let review = {}
                    review['content'] = r.content
                    review['rating'] = r.rating
                    review['date'] = r._kmd
                    this.movieService.getMovie(movieId).subscribe(movie => review['title'] = movie.title)
                    this.reviews.push(review)
                }
            })

        })
    }
    
}