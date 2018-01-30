import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../service/authentication.service'
import { ProfileService } from '../../service/profile.service';
@Component({
    selector: 'profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit{ 

    name:string;
    comments: Array <Object> 
    
    constructor(
        private auth:AuthenticationService, 
        private profileService: ProfileService
    ){
        this.name = auth.getLoggedInUser()
    }

    ngOnInit(){      
        this.loadUserComments()
    }

    loadUserComments(){
        this.comments = [];
        let user = this.auth.getLoggedInUser()
        this.profileService.getAllComments()
        .subscribe(res => {
            // console.log(res.json())
            res.json().forEach(x => {   
                if(x['user']['username'] === user){
                    let comment = {}
                    comment['comment'] = x['comment']
                    comment['_kmd'] = x['_kmd']
                    this.comments.push(comment)
                }      
            })
        }) 
        // console.log(this.comments) 
    }
    
}