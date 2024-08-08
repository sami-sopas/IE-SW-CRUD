import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Movie } from '../Interfaces/movie';
import { firstValueFrom, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private endpoint: string = environment.endPoint;
  private apiUrl: string = this.endpoint + "movies/";

  constructor(private http: HttpClient) { }

  async getList(): Promise<Movie[]> {
    return await firstValueFrom(this.http.get<Movie[]>(this.apiUrl));
  }

  add(movie: Movie): Observable<Movie> {
    return this.http.post<Movie>(`${this.apiUrl}create`, movie);
  }

  update(idMovie: number, movie: Movie): Observable<Movie> {
    return this.http.put<Movie>(`${this.apiUrl}update/${idMovie}`, movie);
  }

  delete(idMovie: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}delete/${idMovie}`);
  }
}
