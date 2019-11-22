import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Borrow } from '../models/borrow.model';
import { Card } from '../models/card.model';
import { Book } from '../models/book.model';
import { domain } from '../config';

const URL = domain + '/borrow';

@Injectable({
    providedIn: 'root'
})

export class BorrowService {

    constructor(private http: HttpClient) { }

    getBorrows(): Observable<Borrow[]> {
        return this.http.get<Borrow[]>(URL);
    }

    getCards(): Observable<Card> {
        return this.http.get<Card>(`${URL}/getcards`);
    }

    getBooks(_id): Observable<Book> {
        return this.http.get<Book>(`${URL}/getbooks?id=${_id}`);
    }

    createBorrow(content: Borrow): Observable<Borrow> {
        return this.http.post<Borrow>(URL, content);
    }

    updateBorrow(_id, content: Borrow): Observable<Borrow> {
        return this.http.put<Borrow>(`${URL}/${_id}`, content);
    }

    deleteBorrow(_id): Observable<Borrow> {
        return this.http.delete<Borrow>(`${URL}/${_id}`);
    }

    getById(_id): Observable<Borrow> {
        return this.http.get<Borrow>(`${URL}/${_id}`);
    }
}