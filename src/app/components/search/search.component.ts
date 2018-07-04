import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../services/movies.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchStr: string;
  searchResMovies= [] ;

  constructor(private movieService: MovieService) { }

  ngOnInit() {
  }

  searchMovies(){
    if(this.searchStr===''){
      this.searchResMovies = [];
    }
    this.movieService.searchMovies(this.searchStr)
      .subscribe(res => {        
        if(!res.Error)
          this.searchResMovies.unshift(res);
      });     
  }

}
