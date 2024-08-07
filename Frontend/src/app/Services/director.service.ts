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

  private apiUrl : string = this.endpoint + "directors";

  constructor(private http:HttpClient) { }

  getList():Observable<Director[]>{
    return this.http.get<Director[]>(this.apiUrl);
  }
}
