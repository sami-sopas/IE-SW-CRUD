import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Director } from '../Interfaces/director';

@Injectable({
  providedIn: 'root'
})
export class DirectorService {

  private endpoint : string = environment.endPoint;
  private apiUrl : string = this.endpoint + "director/";

  constructor(private http:HttpClient) { }

  getList():Observable<Director[]>{
    return this.http.get<Director[]>(this.endpoint + "directors");
  }

  add(director: Director): Observable<Director> {
    return this.http.post<Director>(`${this.apiUrl}create`, director);
  }

  get(idDirector: number): Observable<Director> {
    return this.http.get<Director>(`${this.apiUrl}/${idDirector}`);
  }

  update(idDirector: number, director: Director): Observable<Director> {
    return this.http.put<Director>(`${this.apiUrl}update/${idDirector}`, director);
  }

  delete(idDirector: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}delete/${idDirector}`);
  }
}
