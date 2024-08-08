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

  editMovie(movie: Movie) {
    // this.product = {...product};
    // this.productDialog = true;
}

deleteMovie(movie: Movie) {
    // this.confirmationService.confirm({
    //     message: 'Are you sure you want to delete ' + product.name + '?',
    //     header: 'Confirm',
    //     icon: 'pi pi-exclamation-triangle',
    //     accept: () => {
    //         this.products = this.products.filter(val => val.id !== product.id);
    //         this.product = {};
    //         this.messageService.add({severity:'success', summary: 'Successful', detail: 'Product Deleted', life: 3000});
    //     }
    // });
}
}
