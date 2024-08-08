import { Component, OnInit } from '@angular/core';
import { Movie } from './Interfaces/movie';
import { MovieService } from './Services/movie.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  movies: Movie[] = [];

  constructor(private movieService: MovieService) { }

  first = 0;
  rows = 10;

  ngOnInit() {
    this.movieService.getList().then(movies => this.movies = movies);
  }

  next() {
    this.first = this.first + this.rows;
  }

  prev() {
    this.first = this.first - this.rows;
  }

  reset() {
    this.first = 0;
  }

  isLastPage(): boolean {
    return this.movies ? this.first >= (this.movies.length - this.rows) : true;
  }

  isFirstPage(): boolean {
    return this.movies ? this.first === 0 : true;
  }
}
