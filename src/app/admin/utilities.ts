import { Injectable } from '@angular/core';
@Injectable({
    providedIn: 'root'
})

export class Utilities{
	constructor(){}

	/**
    * [makeFormCheckBoxArray Утилита которая создает массив для формы checkbox из значений отмечено / не отмечено]
    * @param {[array]} arrayPosibleVal [Массив всех возможных значений]
    * @param {[array]} arrayExistVal   [Массив имеющихся значений]
    * @returns {[array]} formArray [массив из значений отмечено / не отмечено]
    */
    makeFormCheckBoxArray(arrayPosibleValObj: Array<any>, arrayExistValObj: Array<any>){
    	let valuesExistArr = [];
    	let formArray: Array<boolean> = [];
    	arrayExistValObj.forEach(arr => {
    		valuesExistArr.push(arr.slug);
    	});
    	
    	arrayPosibleValObj.forEach(arr => {

    		if ( valuesExistArr.indexOf(arr.slug) >= 0 ) {
    			formArray.push(true);
    		} else {
    			formArray.push(false);
    		}
    	});

    	return formArray;     
    }
}

export const UTILS_PROVIDERS: Array<any> = [
{ provide: Utilities, useClass: Utilities }
];