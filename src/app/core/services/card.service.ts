import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Card } from '../models/card.model';
import { Reader } from '../models/reader.model';
import { domain } from '../config';

const URL = domain + '/card';

Injectable({
    providedIn: 'root'
})

export class CardService {

    constructor(private http: HttpClient) { }

    getCards(): Observable<Card[]> {
        return this.http.get<Card[]>(URL);
    }

    getComboboxReader(): Observable<Reader[]> {
        return this.http.get<Reader[]>(URL + '/comboboxreader');
    }

    getCardById(_id: string): Observable<Card> {
        return this.http.get<Card>(`${URL}/${_id}`);
    }

    createCard(content: Card): Observable<Card> {
        return this.http.post<Card>(URL, content);
    }

    updateCard(_id: string, content: Card): Observable<Card> {
        return this.http.put<Card>(`${URL}/${_id}`, content)
    }

    deleteCard(_id: string): Observable<Card> {
        return this.http.delete<Card>(`${URL}/${_id}`);
    }
}