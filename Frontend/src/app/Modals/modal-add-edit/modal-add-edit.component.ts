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
  @Output() refresh = new EventEmitter<void>();

  formMovie: FormGroup;
  action: string = 'new';
  buttonAction: string = 'Save';
  directorsList: Director[] = [];
  selectedDirector: string = '';

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
  }

  addEditMovie() {
    // console.log(this.formMovie);
    // console.log(this.formMovie.value);

    const model : Movie = {
      pkMovie: 0,
      name: this.formMovie.value.name,
      gender: this.formMovie.value.gender,
      duration: this.formMovie.value.duration,
      fkDirector: this.formMovie.value.fkdirector,
      directorName: ''
    }

    this._movieService.add(model).subscribe({
      next: (data) => {
        console.log("Created movie !");
        this.display = false;
        this.refresh.emit();

      },
      error: (error) => {
        console.log("Error creating movie");
        console.log(error);
      }
    })

  }

  saveMovie(): void {

    // if (this.formMovie.valid) {
    //   const movie: Movie = this.formMovie.value;
    //   if (this.action === 'new') {
    //     this._movieService.addMovie(movie).subscribe(() => {
    //       this.hideDialog();
    //     });
    //   } else {
    //     this._movieService.updateMovie(movie).subscribe(() => {
    //       this.hideDialog();
    //     });
    //   }
    // }
  }

  formatDuration(event: any): void {
    const input = event.target.value.replace(/[^0-9]/g, '');
    if (input.length >= 3) {
      event.target.value = input.slice(0, 2) + ':' + input.slice(2, 4);
    } else if (input.length >= 1) {
      event.target.value = input.slice(0, 2);
    }
  }
}
