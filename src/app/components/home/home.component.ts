import { Component, OnInit } from '@angular/core';

import { MoviesService } from '../../service/movies.service'
import { AuthenticationService } from '../../service/authentication.service'

@Component({
  moduleId: module.id,
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  mostRecentMovies: Array<any>

  constructor(
    private moviesService: MoviesService, 
    private auth: AuthenticationService
  ) { }

  ngOnInit() {
    this.moviesService.getLatestMovies()
      .subscribe(res => {
        this.mostRecentMovies = res.slice(0, 12)
      })
  }
}
