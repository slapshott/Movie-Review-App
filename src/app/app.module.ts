// Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { RatingModule } from 'ngx-rating'

// Services
import { routing} from './app.routing'
import { AuthenticationService } from './service/authentication.service'
import { CommentsService } from './service/comments.service'
import { MoviesService } from './service/movies.service'
import { ReviewsService } from './service/reviews.service'

// Components
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/authentication/login/login.component';
import { RegisterComponent } from './components/authentication/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { MovieComponent } from './components/movie/movie.component';
import { ReviewComponent } from './components/review/review.component';

//Guards 
import { GuardsModule } from 'app/guards/guards.module';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    MovieComponent,
    ReviewComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    routing,
    ReactiveFormsModule,
    RatingModule,
    GuardsModule
  ],
  providers: [ 
    AuthenticationService,
    MoviesService,
    CommentsService,
    ReviewsService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
