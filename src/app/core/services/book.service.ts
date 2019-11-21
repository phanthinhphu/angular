import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Book } from '../models/book.model';

const URL = 'http://localhost:3000/book'

@Injectable({
    providedIn: 'root'
})

export class BookService {

    constructor(private http: HttpClient) { }

    getBooks(): Observable<Book[]> {
        return this.http.get<Book[]>(URL);
    }

    getById(_id): Observable<Book> {
        return this.http.get<Book>(`${URL}/${_id}`);
    }

    createBook(content): Observable<Book> {
        return this.http.post<Book>(URL, content);
    }

    updateBook(_id, content): Observable<Book> {
        return this.http.put<Book>(`${URL}/${_id}`, content);
    }

    deleteBook(_id): Observable<Book> {
        return this.http.delete<Book>(`${URL}/${_id}`)
    }

    getcboAuthors():Observable<any>{
        return this.http.get(`${URL}/getcboAuthors`);
    }

    getcboTypeBooks():Observable<any>{
        return this.http.get(`${URL}/getcboTypeBook`);
    }

    getcboPublishers():Observable<any>{
        return this.http.get(`${URL}/getcboPublishers`);
    }

}