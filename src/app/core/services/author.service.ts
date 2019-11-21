import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';

import { Author } from '../models/author.model';

const URL = 'http://localhost:3000/author';
const token = localStorage.getItem('token');
const headers = new HttpHeaders({ token });

@Injectable({
    providedIn: 'root'
})

export class AuthorService {

    constructor(private http: HttpClient) { }

    getAuthors(): Observable<Author[]> {
        return this.http.get<Author[]>(URL);
    }

    createAuthor(content: Author): Observable<Author> {
        return this.http.post<Author>(URL, content);
    }

    updateAuthor(_id: string, content: Author): Observable<Author> {
        return this.http.put<Author>(`${URL}/${_id}`, content)
    }

    deleteAuthor(_id: string): Observable<Author> {
        return this.http.delete<Author>(`${URL}/${_id}`)
    }

    getByIdAuthor(_id: string) {
        return this.http.get<Author>(`${URL}/${_id}`);
    }
}
