import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse }  from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Category } from './category.model';
import { CategoryList } from './category-list.model';
import { Document } from './document.model'
import { Certificate } from './certificate.model';

const DEVELOP = false;
export const API_URL = DEVELOP ? 'http://urist.my' : 'http://api.ius24.ru';
export const STATIC_URL = DEVELOP ? 'http://urist.my' : 'http://static.ius24.ru/public'
export const DOCUMENT_WEB_PATH = `${STATIC_URL}/documents/`;
export const CERTIFICATE_WEB_PATH = `${STATIC_URL}/certificates/`;

@Injectable({
    providedIn: 'root'
})
export class UristService {
    constructor(
        private http: HttpClient,
        @Inject(API_URL) private apiUrl: string
        ) { }
    /**
     * [query Get запрос]
     * @param  {string}            URL    [путь к api]
     * @param  {Array<string>}     params [параметры]
     * @return {Observable<any[]>}        [поток]
     */
     queryGet(
         URL: string,
         params?: Array<string>
         ): Observable<any[]> {
         let queryURL = `${this.apiUrl}${URL}`;
         let  headers = new HttpHeaders();
         headers.append('content-type', 'application/json');
         return this.http.get(queryURL,  {headers : headers})
         .map((responce: any) => responce)
         .catch(this.errorHandler);
     }
    /**
     * [queryPost POST запрос]
     * @param {[type]}  [description]
     */
     queryPost(URL: string, params: any) {
         let queryURL = `${this.apiUrl}${URL}`;
         let  headers = new HttpHeaders();
         headers.append('content-type', 'application/json');
         return this.http.post(queryURL,  params, {headers : headers})
         .map((responce: any) => responce)
         .catch(this.errorHandler);
     }

  /**
   * Получение информации по категории
   * @param slug {string} slug идентификатор
   * @return {object}
   */
   getCategory(slug: string) {
       return this.queryGet(`/public/category/${slug}`).map(responce => {
           let item = responce['result'];
           return new Category({
               title: item.title,
               slug: item.slug,
               services: item.service,
               documents: item.document
           });
       });
   }

  /**
    * Получение списка всех категорий права
    *
    * @return Object Список всех категорий права
    */
    getCategoryList() {
        return this.queryGet(`/public/category/list`).map(responce => {
            return <any>responce['result'].map(item => {
                return new CategoryList({
                    title: item.title,
                    slug: item.slug
                });
            });
        });
    }

  /**
   * Получение списка документов судебной практики
   * @return object Список документов
   */
   getDocumentList() {
       return this.queryGet(`/public/document/list`).map(responce => {
           return <any>responce['result'].map(item => {
               return new Document({
                   name: item.name,
                   path: item.path,
                   slug: item.slug
               });
           });
       });
   }

   /**
   * Получение списка сертификатов
   * @return object Список сертификатов
   */
   getCertificatesList() {
       return this.queryGet(`/public/certificate/list`).map(responce => {
           return <any>responce['result'].map(item => {
               return new Certificate({
                   name: item.name,
                   path: item.path,
                   slug: item.slug
               });
           });
       });
   }

   /**
    * [sentMessage Отправить сообщение]
    */
    sentMessage(data) {
        return this.queryPost(`/public/message/send`, JSON.stringify(data)).map(responce => { return responce });
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
         }
         return Observable.throw(message);
     }
 }