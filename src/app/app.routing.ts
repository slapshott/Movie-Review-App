// Modules
import { ModuleWithProviders } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

// Components
import { HomeComponent } from './components/home/home.component'
import { LoginComponent } from './components/authentication/login/login.component'
import { RegisterComponent } from './components/authentication/register/register.component'
import { ProfileComponent } from './components/profile/profile.component'
import { MovieComponent } from './components/movie/movie.component'
import { ReviewComponent } from './components/review/review.component'
import { AuthGuard } from 'app/guards/authentication/auth.guard';

const appRoutes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: 'movie/:id',
        component: MovieComponent,
        canActivate: [AuthGuard]
    },
    {
        path:'reviews/:movieId/add-review',
        component: ReviewComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'profile',
        component: ProfileComponent
    }
]

export const appRoutingProviders: any[] = []
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes)