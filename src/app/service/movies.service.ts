import { Injectable } from '@angular/core'
import { Http, Headers } from '@angular/http'
import { Jsonp } from '@angular/http'
import 'rxjs/Rx'

@Injectable()
export class MoviesService {

    apiKey: string

    constructor(private jsonp: Jsonp) {
        this.apiKey = '8b6aeacc6e9bcfb0f54cfb35cc5c1828'
    }

    getLatestMovies() {
        let today = new Date()
        let todayAsString = today.toISOString().slice(0, 10)
        let sevenDaysBefore = new Date()
        sevenDaysBefore.setDate(today.getDate() - 7)
        let sevenDaysBeforeAsString = sevenDaysBefore.toISOString().slice(0, 10)

        let headers = new Headers()
        headers.append('Content-Type', 'application/json')

        return this.jsonp.get(`https://api.themoviedb.org/3/discover/movie?callback=JSONP_CALLBACK&primary_release_date.gte=${sevenDaysBeforeAsString}&primary_release_date.lte=${todayAsString}&api_key=${this.apiKey}`)
            .map(x => x.json().results)
    }

    getMovie(id: string) {
        return this.jsonp.get(`https://api.themoviedb.org/3/movie/${id}?callback=JSONP_CALLBACK&sort_by=popularity.desc&api_key=${this.apiKey}`)
            .map(x => x.json())
    }
}