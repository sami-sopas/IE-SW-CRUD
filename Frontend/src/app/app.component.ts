import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(public router: Router, public route: ActivatedRoute) {}
}

// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-movies',
//   templateUrl: './movies.component.html',
//   styleUrls: ['./movies.component.css']
// })
// export class MoviesComponent implements OnInit {

//   constructor() { }

//   ngOnInit(): void {
//   }

// }
