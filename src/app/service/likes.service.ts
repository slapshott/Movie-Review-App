import { Injectable } from '@angular/core'
import { Http, Headers } from '@angular/http'

import { kinvey } from '../utils/constants';

@Injectable()
export class LikesService {
    baseUrl: String;
    appKey: String;
    appSecret: String;

    constructor(private http: Http) {
        this.baseUrl = kinvey.baseUrl;
        this.appKey = kinvey.appKey;
        this.appSecret = kinvey.appSecret;
    }

    addNewLike(addLike, movieId, user){
        let newLike = {
            movieId: movieId,
            like: addLike,
            user : user
        }
        let url = `${this.baseUrl}appdata/${this.appKey}/likes`
        return this.http.post(
            url,
            JSON.stringify(newLike),
            {headers: this.getUserHeaders()}
        )
    }

    removeLike(movieId){
        let url = `${this.baseUrl}appdata/${this.appKey}/likes?query={"movieId":${movieId}}`
        return this.http.delete(url, { headers: this.getUserHeaders() })
    }

    getAllLikes(movieId){
        let url = `${this.baseUrl}appdata/${this.appKey}/likes?query={"movieId":${movieId}}`
        return this.http.get(url, { headers: this.getUserHeaders()} ).map(x => x.json() )
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