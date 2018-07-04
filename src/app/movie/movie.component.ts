import { AuthService } from './../services/auth.service';
import { Movie } from './../Movie';
import { MovieService } from './../services/movies.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit, OnDestroy {
  id: string;
  movie;
  user$;

  subscription: Subscription;

  constructor(private movieService: MovieService,
              private route: ActivatedRoute,
              private authService: AuthService) { }

  ngOnInit() {
   this.subscription = this.route.params
      .map(params=> params['id'])
      .subscribe(id => this.id = id)

      console.log(this.id);

      this.movieService.getMovieById(this.id).subscribe(movie => this.movie = movie);

      this.user$ = this.authService.user$;
      
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  saveMovie(movie){
    this.movieService.saveMovie(movie);
  }

  login(){
    this.authService.login();
  }
}
