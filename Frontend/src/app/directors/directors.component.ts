import { Component, OnInit } from '@angular/core';
import { Director } from '../Interfaces/director';
import { DirectorService } from '../Services/director.service';

@Component({
  selector: 'app-directors',
  templateUrl: './directors.component.html',
  styleUrls: ['./directors.component.css']
})
export class DirectorsComponent implements OnInit {

  directors : Director[] = [];

  constructor(private directorService: DirectorService) { }

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

}
