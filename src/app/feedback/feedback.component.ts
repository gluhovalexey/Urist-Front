import { Component, OnInit } from '@angular/core';
import {
	FormBuilder,
	FormGroup,
	Validators,
	AbstractControl,
} from '@angular/forms';
import { UristService } from '../urist.service'

@Component({
	selector: 'app-feedback',
	templateUrl: './feedback.component.html',
	styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {
	isModalWindowVisible: boolean;
	feedbackForm: FormGroup;
	errorMessage: string;
	name: AbstractControl;
	email: AbstractControl;
	phone: AbstractControl;
	message: AbstractControl;
	sendSuccess: boolean = false;
	
	constructor(
		private fb: FormBuilder,
		private uristService: UristService
		) {
		this.feedbackForm = this.fb.group({
			'name': [ '', Validators.required ],
			'email': [ '', Validators.required ],
			'phone': [ '', Validators.required ],
			'message': [ '', Validators.required ]

		});
		this.name = this.feedbackForm.controls['name'];
		this.email = this.feedbackForm.controls['email'];
		this.phone = this.feedbackForm.controls['phone'];
		this.message = this.feedbackForm.controls['message'];
	}

	ngOnInit() {
	}
	/**
	 * [modalToggle Переключение состояния модального окна]
	 * @param {boolean} switcher [переключатель]
	 */
	modalToggle(switcher: boolean){
		this.isModalWindowVisible = switcher;
	}
	/**
	 * [onFeedbackFormSubmit Обработка события при отправке формы]
	 * @param {[type]} elements [description]
	 */
	onFeedbackFormSubmit(elements){
				let data = {};
	 	Object.keys(elements).forEach(key => {
	 		let element = elements[key];
	 	
	 		switch (element.type) {
	 			case 'text':
	 				data[element.id] = element.value;
	 				break;
	 			case 'textarea':
	 				data[element.id] = element.value;
	 				break;
	 			case 'email':
	 				data[element.id] = element.value;
	 				break;
	 			default:
	 				break;
	 	}
	 	});
	
 		this.onSentMessage(data);
	}
	/**
	 * [onSentMessage Отправить сообщение]
	 * @param {[type]} data [данные формы]
	 */
	onSentMessage(data) {
		this.feedbackForm.valid && this.uristService.sentMessage(data).subscribe(
            result => {
            	this.feedbackForm.reset();
                this.sendSuccess = true;
                setTimeout(function() {
       				this.sendSuccess = false;
       				this.modalToggle(false);
   				}.bind(this), 3000);
        	});
	}
}
