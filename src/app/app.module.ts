// Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { RatingModule } from 'ngx-rating'

// Services
import { routing} from './app.routing'
import { ServiceModule } from './service/service.module'

// Components
import { AppComponent } from './app.component';
import { LoginComponent } from './components/authentication/login/login.component';
import { RegisterComponent } from './components/authentication/register/register.component';
import { NavbarComponent } from 'app/components/navbar/navbar.component';
import { ProfileComponent } from './components/profile/profile.component'
import { HomeComponent } from './components/home/home.component';
import { MovieComponent } from './components/movie/movie.component';
import { ReviewComponent } from './components/review/review.component';

//Guards 
import { GuardsModule } from 'app/guards/guards.module';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProfileComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
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
    GuardsModule,
    ServiceModule,
  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
