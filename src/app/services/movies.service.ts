import { Injectable, OnInit } from "@angular/core";
import { Http } from '@angular/http';
import { AngularFireDatabase } from 'angularfire2/database';
import { AuthService } from "./auth.service";
import 'rxjs/add/operator/map';

@Injectable()
export class MovieService implements OnInit {
    private searchUrl:string; 
    private movieUrl: string;
    private apiKey: string = 'f6ecbedd';
    user: firebase.User;

    constructor(private http: Http, 
                private db : AngularFireDatabase, 
                private authService: AuthService)
        {

            this.authService.user$.subscribe(user => this.user = user);

        }

    ngOnInit(){
    }

    searchMovies(title: string, type='movie'){
        this.searchUrl = `https://www.omdbapi.com/?apikey=${this.apiKey}&t=${title}&type=${type}` ;
        return this.http.get(this.searchUrl)
            .map(res => res.json());
    }

    getMovieById(id: string, type='movie'){
        this.movieUrl = `https://www.omdbapi.com/?apikey=${this.apiKey}&i=${id}&type=${type}` ;
        return this.http.get(this.movieUrl)
            .map(res => res.json());
    }

    saveMovie(movieToSave){
        this.db.list('/users/'+this.user.uid).push({
            id: movieToSave.imdbID,
            title: movieToSave.Title,
            poster: movieToSave.Poster,
            imdbRating: movieToSave.imdbRating,
            released: movieToSave.Released
            })
    }

    getAllSavedMovies(id){
        return this.db.list('/users/'+this.user.uid);        
    }

     removeDuplicates(originalArray, objKey) {
        var trimmedArray = [];
        var values = [];
        var value;
      
        for(var i = 0; i < originalArray.length; i++) {
          value = originalArray[i][objKey];
    
          if(values.indexOf(value) === -1) {
            trimmedArray.push(originalArray[i]);
            values.push(value);
          }
        }
      
        return trimmedArray;
      
      }


}