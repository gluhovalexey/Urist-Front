import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { API_URL } from './urist.service';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()

export class AuthService {

    public token: string;

    constructor(
        private http: HttpClient,
        @Inject(API_URL) private apiUrl: string
        ){
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
    }

    login(username: string, password: string): Observable<any> {

        let headers = new HttpHeaders({'Content-type': 'application/x-www-form-urlencoded'});
        let body = `username=${username}&password=${password}`;
        return this.http.post(`${this.apiUrl}/api/login_check`, body, { headers: headers} )
        .map(response => {
            const token = response && response['token'];
            if (token) {
                this.token = token;
                localStorage.setItem('currentUser', JSON.stringify({ username: username, token: token }));
                return true;
            } else {
                return false;
            }
        }).catch(this.errorHandler);
    }

    logout(): any {
        localStorage.removeItem('currentUser');
    }

    getUser(): any {
        return localStorage.getItem('currentUser') && JSON.parse(localStorage.getItem('currentUser')).username;
    }

    isLoggedIn(): boolean {
        return this.getUser() !== null;
    }

    private errorHandler(error: HttpErrorResponse) {
        var message;
        switch (error.status) {
            case 404:
            message = 'Ничего не найдено';
            break;
            case 401:
            message = 'Неверное имя пользователя или пароль';
            break;         
            default:
            message = 'Произошла ошибка';
        }
        return Observable.throw(message);
    }
}

export const AUTH_PROVIDERS: Array<any> = [
{ provide: AuthService, useClass: AuthService }
];
