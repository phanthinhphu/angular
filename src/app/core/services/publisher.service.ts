import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Publisher } from '../models/publisher.model';
import { domain } from '../config';

const URL = domain+'/publisher/';

@Injectable({
    providedIn: 'root'
})

export class PublisherService {

    constructor(private http: HttpClient) { }

    getPublishers(): Observable<Publisher[]> {
        return this.http.get<Publisher[]>(URL);
    }

    getById(_id): Observable<Publisher> {
        return this.http.get<Publisher>(`${URL}/${_id}`);
    }

    createPublisher(content): Observable<Publisher> {
        return this.http.post<Publisher>(URL, content);
    }

    updatePublisher(_id, content): Observable<Publisher> {
        return this.http.put<Publisher>(`${URL}/${_id}`, content);
    }

    deletePublisher(_id): Observable<Publisher> {
        return this.http.delete<Publisher>(`${URL}/${_id}`)
    }

}