import { Injectable } from '@angular/core'
import { Http, Headers } from '@angular/http'
import { kinvey } from '../utils/constants'
@Injectable()

export class ProfileService {

    baseUrl: String;
    appKey: String;
    appSecret: String;

    constructor(private http: Http){
        this.baseUrl = kinvey.baseUrl;
        this.appKey = kinvey.appKey;
        this.appSecret = kinvey.appSecret;
    }


    getAllComments(){
        let url = `${this.baseUrl}appdata/${this.appKey}/comments`
        return this.http.get(url,  { headers: this.getUserHeaders() } )
    }

    getUserHeaders() {
        let headers = new Headers()
        headers.append('Authorization', 'Kinvey ' + JSON.parse(localStorage.getItem('profile'))['_kmd']['authtoken'])
        headers.append('Content-Type', 'application/json')
        return headers;
    }
}