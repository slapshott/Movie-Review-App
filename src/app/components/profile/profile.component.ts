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
    }

    loadUserComments(){
        let movieId;
        let user = this.auth.getLoggedInUser()
        this.profileService.getAllComments()
        .subscribe(res => {
            res.json().forEach(x => {  
                if(x['user']['username'] === user){
                    movieId = x['movieId']
                    let comment = {}
                    comment['comment'] = x['comment']
                    comment['_kmd'] = x['_kmd'] 
                    this.movieService.getMovie(movieId).subscribe(movie => comment['title'] = movie['title'])
                    this.comments.push(comment)
                }      
            })
        }) 
    }
    
}