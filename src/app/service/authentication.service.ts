import { Injectable } from '@angular/core'
import { Http, Headers } from '@angular/http'

import { Router } from '@angular/router';


import { kinvey } from '../utils/constants';
import { Jsonp } from '@angular/http';

@Injectable()
export class AuthenticationService {

    public redirectUrl : string;
    baseUrl: String;
    appKey: String;
    appSecret: String;

    constructor(private http: Http, private router: Router) {
        this.baseUrl = kinvey.baseUrl;
        this.appKey = kinvey.appKey;
        this.appSecret = kinvey.appSecret;
    }

    register(username, password) {
        let registerUrl = this.baseUrl + 'user/' + this.appKey + '/';
        let data = { username: username, password: password }
        let headers = new Headers();
        headers.append('Authorization', "Basic " + btoa(this.appKey + ":" + this.appSecret))
        headers.append('Content-Type', 'application/json');

        return this.http.post(registerUrl, JSON.stringify(data), { headers: headers })
            .map(x => x.json())
            .subscribe(
            res => {
                this.router.navigate(['/login'])
            },
            err => {
                console.log(err)
            }
            );
    }

    login(username, password) {
        let loginUrl = this.baseUrl + 'user/' + this.appKey + '/login';
        let data = { username: username, password: password }
        let headers = new Headers();
        headers.append('Authorization', "Basic " + btoa(this.appKey + ":" + this.appSecret))
        headers.append('Content-Type', 'application/json');

        return this.http.post(loginUrl, JSON.stringify(data), { headers: headers })
            .map(x => x.json())
            .subscribe(
                res => {  
                    if(res._kmd.roles !== undefined){
                        localStorage.setItem('role', 'admin')
                    }
                    this.router.navigate(['/'])
                    localStorage.setItem('profile', JSON.stringify(res))
                },
                err => {
                    this.router.navigate(['/login'])
                });
    }

    isLoggedIn() {
        if (localStorage.getItem('profile') != null) {
            return true;
        }

        return false;
    }

    getLoggedInUserId() {
        if (this.isLoggedIn()) {
            return JSON.parse(localStorage.getItem('profile'))['_id'];
        }

        return null;
    }

    getLoggedInUser(){
        if(this.isLoggedIn()){
            return JSON.parse(localStorage.getItem('profile'))['username']
        }

        return null
    }

    isAdmin(){
        if(localStorage.getItem('role') === 'admin'){
            return true
        }

        return false
    }

    logout() {
        let headers = new Headers()

        headers.append('Authorization', ('Kinvey ' + JSON.parse(localStorage.getItem('profile'))['_kmd']['authtoken']))
        headers.append('Content-Type', 'application/json')


        let logoutUrl = this.baseUrl + 'user/' + this.appKey + '/_logout';
        this.http.post(logoutUrl, null, { headers: headers })
            .subscribe(
            res => {    
                localStorage.clear();
                this.router.navigate['']
            },
            err => console.log(err)
            )
    }

}
