import { AuthService } from './../../services/auth.service';
import { MovieService } from './../../services/movies.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-saved-movies',
  templateUrl: './saved-movies.component.html',
  styleUrls: ['./saved-movies.component.css']
})
export class SavedMoviesComponent implements OnInit, OnDestroy {
  movies$;
  movies;
  filtertedMovies;
  subscription: Subscription
  constructor(private movieService: MovieService, private authService: AuthService) {
   }


 async ngOnInit() {
    this.subscription = this.authService.user$.subscribe(user =>{
      this.movies$ = this.movieService.getAllSavedMovies(user.uid)
      .subscribe(movies=> {
        this.movies = movies;
        this.filtertedMovies = this.movieService.removeDuplicates(this.movies, 'id')                
      })
    })   
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
