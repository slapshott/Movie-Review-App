import { Injectable } from '@angular/core'
import { Http, Headers } from '@angular/http'
import { Router } from '@angular/router';

import { kinvey } from '../utils/constants';

@Injectable()
export class CommentsService{
    baseUrl: String;
    appKey: String;
    appSecret: String;

    constructor(private http: Http, private router: Router) {
        this.baseUrl = kinvey.baseUrl;
        this.appKey = kinvey.appKey;
        this.appSecret = kinvey.appSecret;
    }

    addNewComment(comment: string, movieId: number) {
        let newComment = {
            movieId: movieId,
            user: this.getUserDetails(),
            comment: comment
        }

        let url = `${this.baseUrl}appdata/${this.appKey}/comments`
        return this.http.post(
            url, 
            JSON.stringify(newComment), 
            { headers: this.getUserHeaders() }
        )
    }

    getAllComments(movieId) {
        let url = `${this.baseUrl}appdata/${this.appKey}/comments?query={"movieId":${movieId}}`
        return this.http.get(url, { headers: this.getUserHeaders() }).map(x => x.json())
    }

    deleteComment(id){
        let url = `${this.baseUrl}appdata/${this.appKey}/comments/${id}`
        return this.http.delete( url, {headers: this.getUserHeaders()} )
    }

    editComment(edittedComment){
        let url = `${this.baseUrl}appdata/${this.appKey}/comments/${edittedComment._id}`

        return this.http.put(
            url,
            JSON.stringify(edittedComment),
            {headers: this.getUserHeaders()}
        )
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