import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { API_URL } from './urist.service';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Category } from './category.model';
import { Document } from './document.model';
import { Service } from './service.model';
import { User } from './user.model';

import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class AdminService {

    constructor(
        private http: HttpClient,
        private authenticationService: AuthService,
        @Inject(API_URL) private apiUrl: string
        ) { }

    /**
    * [query Get запрос]
    * @param  {string}            URL    [путь к api]
    * @param  {Array<string>}     params [параметры]
    * @return {Observable<any[]>}        [поток]
    */
    queryGet(URL: string, params?: Array<string>): Observable<any[]> {
        let queryURL = `${this.apiUrl}${URL}`;
        let  headers = new HttpHeaders({'Authorization': 'Bearer ' + this.authenticationService.token});
        return this.http.get(queryURL,  {headers : headers})
        .map((responce: any) => responce)
        .catch(this.errorHandler);
    }

    /**
     * [queryPost Запрос POST]
     * @param {string} URL    [URL]
     * @param {any}    params [параметры]
     */
    queryPost(URL: string, params: any) {
        let queryURL = `${this.apiUrl}${URL}`;
        let  headers = new HttpHeaders({'Authorization': 'Bearer ' + this.authenticationService.token});
        return this.http.post(queryURL,  params, {headers : headers})
        .map((responce: any) => responce)
        .catch(this.errorHandler);
    }

    /**
     * @param {string} URL    [URL]
     * @param {any}    params [параметры]
     */
    queryPut(URL: string, params: any) {
        let queryURL = `${this.apiUrl}${URL}`;
        let  headers = new HttpHeaders({'Authorization': 'Bearer ' + this.authenticationService.token});
        return this.http.put(queryURL,  params, {headers : headers})
        .map((responce: any) => responce)
        .catch(this.errorHandler);
    }

    queryDelete(URL: string) {
        let queryURL = `${this.apiUrl}${URL}`;
        let  headers = new HttpHeaders({'Authorization': 'Bearer ' + this.authenticationService.token});
        return this.http.delete(queryURL, {headers : headers})
        .map((responce: any) => responce)
        .catch(this.errorHandler);
    }

    /**
     * [getDocumentEntityList Получение массива сущностей всех документов]
     * @return [Array] Document[] Массив сущностей документов
     */
    getDocumentEntityList() {
        return this.queryGet(`/api/document/entity-list`).map(responce => {
            return <any>responce['result'].map(item => {
                return new Document({
                    name: item.name,
                    path: item.path,
                    slug: item.slug,
                    categories: item.category
                });
            });
        });
    }

    /**
     * [uploadFile Загрузка файла на сервер]
     * @param  {File}               fileToUpload     [файл]
     * @param  {string}             fileName         [имя файла]
     * @param  {Array<string>}      documentCategory [массив из категория]
     * @return {Observable<Object>}                  [ответ сервера]
     */
    uploadDocument(fileToUpload: File, fileName: string, documentCategory: Array<string>): Observable<Object> {
        const formData: FormData = new FormData();
        formData.append('file', fileToUpload, fileName);
        formData.append('category', JSON.stringify(documentCategory));
        formData.append('name', fileName);

        return this.queryPost(`/api/document/upload`, formData).map(responce => { return responce });
    }

    /**
     * [editDocument description]
     * @param {Array<any>} data [данные формы]
     * @param {[string]}     slug [slug идентификатор]
     * @return {[Object]} responce [ответ сервера]
     */
    editDocument(data: Array<any>, slug)
    {
        return this.queryPut(`/api/document/edit/${slug}`, JSON.stringify(data)).map(response => { return  response });
    }

    /**
     * [deleteDocument удаление документа]
     * @param {[string]} slug [slug идентификатор]
     * @return {[Object]} response [ответ сервера]
     */
    deleteDocument(slug) {
        let queryUrl = `/api/document/delete/${slug}`;

        return this.queryDelete(queryUrl).map( responce => { return responce });
    }
    
    /**
     * [createCategory Создание новой категории]
     * @param {[type]} data [данные формы]
     */
    createCategory(data): Observable<Object>{
        return this.queryPost(`/api/category/create`, JSON.stringify(data)).map(responce => { return responce });
    }

    /**
     * [editCategory Редактирование категории]
     * @param {Array<any>} data [данные формы]
     * @param {[type]}     slug [slug идентификатор]
     */
    editCategory(data: Array<any>, slug)
    {
        return this.queryPut(`/api/category/edit/${slug}`, JSON.stringify(data)).map(response => { return  response });
    }

    /**
     * [deleteCategory удаление категории]
     * @param {[type]} slug [slug идентификатор]
     * @return {[Object]} response [ответ сервера]
     */
    deleteCategory(slug) {
        let queryUrl = `/api/category/delete/${slug}`;
        return this.queryDelete(queryUrl).map( responce => { return responce });
    }
   
    /**
     * [getServiceEntityList получение всех сущностей услуг]
     * @return responce сущности услуг \ ошибка сервера
     */
    getServiceEntityList() {
        return this.queryGet(`/api/service/entity-list`).map(responce => {
            return <any>responce['result'].map(item => {
                return new Service({
                    title: item.title,
                    price: item.price,
                    slug: item.slug,
                    categories: item.category
                });
            });
        });
    }

    /**
     * [createService создание сущности услуги]
     * @param  {[Object]}             data [данные формы]
     * @return {Observable<Object>}      [ответ сервера]
     */
    createService(data): Observable<Object> {
        return this.queryPost(`/api/service/create`, JSON.stringify(data)).map(responce => { return responce });
    }

    /**
     * [editService description]
     * @param {Array<any>} data [данные формы]
     * @param {[string]}     slug [slug идентификатор]
     * @return {[Object]} responce [ответ сервера]
     */
    editService(data: Array<any>, slug)
    {
        return this.queryPut(`/api/service/edit/${slug}`, JSON.stringify(data)).map(response => { return  response });
    }

    /**
     * [deleteService удаление категории]
     * @param {[type]} slug [slug идентификатор]
     * @return {[Object]} response [ответ сервера]
     */
    deleteService(slug) {
        let queryUrl = `/api/service/delete/${slug}`;
        return this.queryDelete(queryUrl).map( responce => { return responce });
    }

    /**
     * [getUsers Получение сущностей пользователей]
     * @return {Observable<any>} [description]
     */
    getUsers(): Observable<any> {
        return this.queryGet(`/api/user/list`).map(responce => {
            return <any>responce['result'].map(item => {
                return new User({
                    id: item.id,
                    username: item.username,
                    email: item.email,
                    is_active: item.is_active
                });
            });
        });
    }

    /**
     * [createUser создание пользователя]
     * @param  {[type]}             data [данные пользователя]
     * @return {Observable<Object>}      [поток]
     */
    createUser(data): Observable<Object> {
        return this.queryPost(`/api/user/create`, JSON.stringify(data)).map(responce => { return responce });
    }

    /**
     * [deleteUser Удаление пользователя]
     * @param {[type]} id [шid пользователя]
     */
    deleteUser(id) {
        let queryUrl = `/api/user/delete/${id}`;

        return this.queryDelete(queryUrl).map( responce => { return responce });
    }

    /**
     * [uploadFile Загрузка сертификата на сервер]
     * @param  {File}               fileToUpload     [файл]
     * @param  {fileName}             fileName       [имя файла]
     * @return {Observable<Object>}                  [ответ сервера]
     */
    uploadCertificate(fileToUpload: File, fileName: string): Observable<Object> {
        const formData: FormData = new FormData();
        formData.append('file', fileToUpload, fileName);

        return this.queryPost(`/api/certificate/upload`, formData).map(responce => { return responce });
    }

    /**
     * [editCertificate редактирование сертификата]
     * @param {Array<any>} data [данные формы]
     * @param {[string]}     slug [slug идентификатор]
     * @return {[Object]} responce [ответ сервера]
     */
    editCertificate(data: Array<any>, slug)
    {
        return this.queryPut(`/api/certificate/edit/${slug}`, JSON.stringify(data)).map(response => { return  response });
    }

    /**
     * [deleteCertificate удаление сертификата]
     * @param {[string]} slug [slug идентификатор]
     * @return {[Object]} response [ответ сервера]
     */
    deleteCertificate(slug) {
        let queryUrl = `/api/certificate/delete/${slug}`;

        return this.queryDelete(queryUrl).map( responce => { return responce });
    }

    /**
    * [errorHandler Функция для отлова ошибок]
    * @param {HttpErrorResponse} error [текс ошибки]
    */
    private errorHandler(error: HttpErrorResponse) {
        var message;
        switch (error.status) {
            case 404:
            message = 'Ничего не найдено';
            break;
            case 401:                      
                localStorage.clear();
                window.location.reload();      
            message = 'Трубуется авторизация';
            break;
            default:
            message = 'Произошла ошибка';
        }
        return Observable.throw(message);
    }
}

export const ADMIN_PROVIDERS: Array<any> = [
{ provide: AdminService, useClass: AdminService }
];