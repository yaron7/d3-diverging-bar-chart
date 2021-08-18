import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  readonly baseUrl = '../assets'

  constructor(private http: HttpClient) { }

  get(param: string) {
    return this.http.get(`${this.baseUrl}/${param}.json`).
      pipe(
        tap(res => console.log(res)),
        map((x: any) => (x[`${param}`]))
      )
  }
}
