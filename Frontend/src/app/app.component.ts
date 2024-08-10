import { Component, OnInit, ViewChild } from '@angular/core';
import { Movie } from './Interfaces/movie';
import { MovieService } from './Services/movie.service';
import { ModalAddEditComponent } from 'src/app/Modals/modal-add-edit/modal-add-edit.component';
import {ConfirmationService} from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  display: boolean = false;
  movies: Movie[] = [];

  @ViewChild(ModalAddEditComponent) modalAddEditComponent!: ModalAddEditComponent;

  constructor(private movieService: MovieService, private confirmationService: ConfirmationService) {}

  first = 0;
  rows = 10;

  confirm(movie: Movie) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete this movie?',
      accept: () => {
        this.movieService.delete(movie.pkmovies).subscribe({
          next: () => {
            console.log('Movie deleted successfully');
            this.onRefresh();
          },
          error: (error) => {
            console.error('Error deleting movie', error);
          }
        });
      }
    });
  }

  showDialog() {
    this.modalAddEditComponent.setMovie(null);
    this.display = false;
    setTimeout(() => {
      this.display = true;
      console.log(this.display);
    }, 0);
  }

  showEditDialog(movie: Movie) {
    this.modalAddEditComponent.setMovie(movie);
    this.display = false;
    setTimeout(() => {
      this.display = true;
    }, 0);
  }

  ngOnInit(): void {
    this.loadMovies();
  }

  loadMovies(): void {
    this.movieService.getList().then((movies: Movie[]) => {
      this.movies = movies;
    });
  }

  onRefresh(): void {
    this.loadMovies(); // Refrescar el listado de películas
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
