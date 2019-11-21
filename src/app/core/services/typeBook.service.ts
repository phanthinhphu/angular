import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { TypeBook } from '../models/typebook.model';

const URL = 'http://localhost:3000/typebook';

@Injectable({
  providedIn: 'root'
})
export class TypeBookService {

  constructor(private http: HttpClient) { }

  getTypeBookById(_id: string): Observable<TypeBook[]> {
    return this.http.get<TypeBook[]>(`${URL}/${_id}`)
  }

  getTypeBooks(): Observable<TypeBook> {
    return this.http.get<TypeBook>(URL);
  }

  createTypeBook(contetn: TypeBook): Observable<TypeBook> {
    return this.http.post<TypeBook>(URL, contetn);
  }

  updateTypeBook(_id: string, content: TypeBook): Observable<TypeBook> {
    return this.http.put<TypeBook>(`${URL}/${_id}`, content);
  }

  deleteTypeBook(_id: string): Observable<TypeBook> {
    return this.http.delete<TypeBook>(`${URL}/${_id}`);
  }
}
