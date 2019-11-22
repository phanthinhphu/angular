import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Login } from '../models/login.model';
import { User } from '../models/user.model';
import { domain } from '../config';

const URL = domain + '/user';

@Injectable({
    providedIn: 'root'
})

export class UserService {

    constructor(private http: HttpClient) { }

    getUsers(): Observable<User> {
        return this.http.get<User>(URL);
    }

    getUser(_id): Observable<User> {
        return this.http.get<User>(`${URL}/${_id}`)
    }

    createUser(content): Observable<User> {
        return this.http.post<User>(URL, content);
    }

    updateUser(_id, content): Observable<User> {
        return this.http.put<User>(`${URL}/${_id}`, content);
    }

    deleteUser(_id) {
        return this.http.delete<User>(`${URL}/${_id}`);
    }

    login(content: Login): Observable<Login> {
        return this.http.post<Login>(`${URL}/login`, content);
    }

    checkToken(token): Observable<User> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'token': token
            })
        };
        return this.http.get<User>(`${URL}/checktoken`, httpOptions)
    }

}