import { AuthenticationService } from './authentication.service';
import { MoviesService } from './movies.service';
import { CommentsService } from './comments.service';
import { ReviewsService } from './reviews.service';
import { ProfileService } from './profile.service';
import { LikesService } from './likes.service';

export const allServices = [
    AuthenticationService, 
    MoviesService, 
    CommentsService, 
    ReviewsService,
    ProfileService,
    LikesService
]
