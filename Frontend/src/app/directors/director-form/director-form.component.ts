import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DirectorService } from 'src/app/Services/director.service';
import { Director } from 'src/app/Interfaces/director';

@Component({
  selector: 'app-director-form',
  templateUrl: './director-form.component.html',
  styleUrls: ['./director-form.component.css']
})
export class DirectorFormComponent implements OnInit {
  directorForm: FormGroup;
  directorId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private directorService: DirectorService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.directorForm = this.fb.group({
      name: ['', Validators.required],
      age: ['', Validators.required],
      active: [false]
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.directorId = +id;
        this.loadDirector(this.directorId);
      }
    });
  }

  loadDirector(id: number): void {
    this.directorService.get(id).subscribe({
      next: (director: Director) => {
        this.directorForm.patchValue(director);
      },
      error: (error) => {
        console.error('Error loading director', error);
      }
    });
  }

  saveDirector(): void {
    if (this.directorForm.valid) {
      let director: Director = this.directorForm.value;
      if (this.directorId) {
        this.directorService.update(this.directorId, director).subscribe({
          next: () => this.router.navigate(['/directors']),
          error: (error) => console.error('Error updating director', error)
        });
      } else {
        this.directorService.add(director).subscribe({
          next: () => this.router.navigate(['/directors']),
          error: (error) => console.error('Error creating director', error)
        });
      }
    }
  }
}
