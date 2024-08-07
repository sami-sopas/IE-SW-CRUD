import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Movie } from '../Interfaces/movie';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private endpoint : string = environment.endPoint;

  private apiUrl : string = this.endpoint + "movies/";

  constructor(private http:HttpClient) { }

  getList():Observable<Movie[]>{
    return this.http.get<Movie[]>(this.apiUrl);
  }

  add(movie:Movie):Observable<Movie>{
    return this.http.post<Movie>(`${this.apiUrl}create`, movie);
  }

  update(idMovie:number, movie:Movie):Observable<Movie>{
    return this.http.put<Movie>(`${this.apiUrl}update/${idMovie}`, movie);
  }

  delete(idMovie:number):Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}delete/${idMovie}`);
  }
}
