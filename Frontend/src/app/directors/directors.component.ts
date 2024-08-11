import { Component, OnInit } from '@angular/core';
import { Director } from '../Interfaces/director';
import { DirectorService } from '../Services/director.service';
import { ConfirmationService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-directors',
  templateUrl: './directors.component.html',
  styleUrls: ['./directors.component.css']
})
export class DirectorsComponent implements OnInit {

  directors : Director[] = [];

  constructor(private router: Router,private directorService: DirectorService, private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.loadDirectors();
  }

  loadDirectors(){
    this.directorService.getList().subscribe({
      next: (data) => {
        this.directors = data;
      },
      error: (error) => {
        console.error("Error loading directors", error);
      }
    })
  }


  deleteMovie(idDirector: number) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete this movie?',
      accept: () => {
        this.directorService.delete(idDirector).subscribe({
          next: () => this.loadDirectors(),
          error: (error) => {
            console.error('Error deleting movie', error);
          }
        });
      }
    });
  }

}
