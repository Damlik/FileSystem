import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { News } from '../models/news';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  public getCountOfNews(count?: number): Observable<any> {
    let params = new HttpParams();

    params = count ? params.append('_limit', count) : params;

    return this.http.get('http://jsonplaceholder.typicode.com/posts', { params: params })
  }

  public getNewsFromId(id: number): Observable<News> {
    return this.http.get('http://jsonplaceholder.typicode.com/posts/' + id)
  }

  public patchNews(id: number, newsBody: News): Observable<News> {
    return this.http.patch('http://jsonplaceholder.typicode.com/posts/' + id, newsBody)
  }

  public deleteNews(id: number): Observable<any> {
    return this.http.delete('http://jsonplaceholder.typicode.com/posts/' + id)
  }
}
