import { Injectable } from '@angular/core'
import { Http, Headers } from '@angular/http'
import { Router } from '@angular/router';

import { kinvey } from '../utils/constants';

@Injectable()
export class ReviewsService {

    baseUrl: String;
    appKey: String;
    appSecret: String;

    constructor(private http: Http, private router: Router) {
        this.baseUrl = kinvey.baseUrl;
        this.appKey = kinvey.appKey;
        this.appSecret = kinvey.appSecret;
    }

    addNewReview(starsCount: number, reviewContnet: string, movie: Object) {
        let newReview = {
            user: this.getUserDetails(),
            rating: starsCount,
            content: reviewContnet,
            movieId: movie['id']
        }

        let url = `${this.baseUrl}appdata/${this.appKey}/reviews`
        return this.http.post(
            url,
            JSON.stringify(newReview), 
            { headers: this.getUserHeaders() } 
        )
            
    }

    getAllReviews(movieId){
        let url = `${this.baseUrl}appdata/${this.appKey}/reviews?query={"movieId":${movieId}}`
        return this.http.get(url, { headers: this.getUserHeaders() }).map(x => x.json())
    }

    getUserHeaders() {
        let headers = new Headers()
        headers.append('Authorization', 'Kinvey ' + JSON.parse(localStorage.getItem('profile'))['_kmd']['authtoken'])
        headers.append('Content-Type', 'application/json')
        return headers;
    }

    getUserDetails() {
        return {
            id: JSON.parse(localStorage.getItem('profile'))['_id'],
            username: JSON.parse(localStorage.getItem('profile'))['username']
        }
    }
}