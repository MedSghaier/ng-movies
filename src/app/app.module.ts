import { AuthService } from './services/auth.service';
import { MovieComponent } from './movie/movie.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router' ;
import { FormsModule } from '@angular/forms';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';



import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SavedMoviesComponent } from './components/saved-movies/saved-movies.component';
import { SearchComponent } from './components/search/search.component';
import { MovieService } from './services/movies.service';
import { HttpModule } from '@angular/http';
import { environment } from '../environments/environment';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { AuthGuard } from './services/auth-guard.service';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SavedMoviesComponent,
    SearchComponent,
    MovieComponent,
    MovieCardComponent
  ],
  imports: [
    BrowserModule,
    AngularFireAuthModule,
    FormsModule,
    HttpModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(environment.firebase),
    RouterModule.forRoot([
      {path: '', component: SearchComponent},
      {path: 'movies/:id', component: MovieComponent},
      {path: 'saved-movies', component: SavedMoviesComponent, canActivate: [AuthGuard]},
    ])
    
  ],
  providers: [
    AuthService,
    AuthGuard,
    MovieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
