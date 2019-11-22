import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reader } from '../models/reader.model';
import { domain } from '../config';

const URL = domain+'/reader/';

@Injectable({
    providedIn: 'root'
})

export class ReaderService {

    constructor(private http: HttpClient) { }

    getReaders(): Observable<Reader[]> {
        return this.http.get<Reader[]>(URL);
    }

    getReader(_id): Observable<Reader> {
        return this.http.get<Reader>(`${URL}/${_id}`);
    }

    createReader(content: Reader): Observable<Reader> {
        return this.http.post<Reader>(URL, content);
    }

    updateReader(_id, content: Reader): Observable<Reader> {
        return this.http.put<Reader>(`${URL}/${_id}`, content);
    }

    deleteReader(_id): Observable<Reader> {
        return this.http.delete<Reader>(`${URL}/${_id}`);
    }


}
