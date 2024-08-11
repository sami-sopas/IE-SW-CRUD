import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Director } from 'src/app/Interfaces/director';
import { DirectorService } from 'src/app/Services/director.service';
import { Movie } from 'src/app/Interfaces/movie';
import { MovieService } from 'src/app/Services/movie.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-modal-add-edit',
  templateUrl: './modal-add-edit.component.html',
  styleUrls: ['./modal-add-edit.component.css']
})
export class ModalAddEditComponent implements OnInit {
  @Input() display: boolean = false;
  @Output() displayChange = new EventEmitter<boolean>();
  @Output() refresh = new EventEmitter<void>();

  formMovie: FormGroup;
  action: string = 'new';
  buttonAction: string = 'Save';
  directorsList: Director[] = [];
  selectedDirector: string = '';
  movie: Movie | null = null;

  // Inyectar referencias en el constructor
  constructor(
    private fb: FormBuilder,
    private _directorService: DirectorService,
    private _movieService: MovieService,
  ) {
    this.formMovie = this.fb.group({
      name: ['', Validators.required],
      gender: ['', Validators.required],
      duration: ['', Validators.required],
      fkdirector: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadDirectors();
  }

  loadDirectors(): void {
    this._directorService.getList().subscribe((directors: Director[]) => {
      this.directorsList = directors;
    });
  }

  hideDialog(): void {
    this.display = false;
    this.displayChange.emit(this.display);
    this.formMovie.reset();
    this.movie = null;
  }

  addEditMovie() {
    if (this.movie) {
      // Editar película existente
      const updatedMovie: Movie = {
        ...this.movie,
        ...this.formMovie.value
      };

      console.log(updatedMovie);

      this._movieService.update(updatedMovie.pkmovies,updatedMovie).subscribe({
        next: (data) => {
          console.log("Updated movie!");
          this.display = false;
          this.refresh.emit();
        },
        error: (error) => {
          console.log("Error updating movie");
          console.log(error);
        }
      });
    } else {
      // Agregar nueva película
      const newMovie: Movie = {
        ...this.formMovie.value
      };

      this._movieService.add(newMovie).subscribe({
        next: (data) => {
          console.log("Created movie!");
          this.display = false;
          this.refresh.emit();
        },
        error: (error) => {
          console.log("Error creating movie");
          console.log(error);
        }
      });
    }
  }

  setMovie(movie: Movie | null): void {
    this.movie = movie;
    if (movie) {
      this.formMovie.patchValue(movie);
      this.action = 'edit';
      this.buttonAction = 'Update';
    } else {
      this.formMovie.reset();
      this.action = 'new';
      this.buttonAction = 'Save';
    }
  }

  formatDuration(event: any): void {
      const input = event.target.value.replace(/[^0-9]/g, '');
      if (input.length >= 3) {
          let minutes = parseInt(input.slice(0, 2), 10);
          let seconds = parseInt(input.slice(2, 4), 10);
          if (minutes > 12 || (minutes === 12 && seconds > 59)) {
              event.target.value = '12:59';
          } else {
              event.target.value = input.slice(0, 2) + ':' + input.slice(2, 4);
          }
      } else if (input.length >= 1) {
          let minutes = parseInt(input.slice(0, 2), 10);
          if (minutes > 12) {
              event.target.value = '12';
          } else {
              event.target.value = input.slice(0, 2);
          }
      }
  }
}
