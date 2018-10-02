import { 
	Component, 
	OnInit, 
	Input, 
	Output, 
	EventEmitter
} from '@angular/core';

import { 
	FormControl, 
	FormGroup, 
	FormBuilder, 
	FormArray,
	Validators,
	AbstractControl
} from '@angular/forms';

import { Service } from '../../service.model';
import { CategoryList } from '../../category-list.model';
import { AdminService } from '../../admin.service';
import { Utilities } from '../utilities';

@Component({
	selector: 'app-service-edit',
	templateUrl: './service-edit.component.html',
	styleUrls: ['./service-edit.component.css']
})
export class ServiceEditComponent implements OnInit {

	serviceForm: FormGroup;
	title: AbstractControl;
	price: AbstractControl;
	@Input() categories: CategoryList[];
	@Input() service: Service;
	@Output() modalWindowToggle = new EventEmitter<boolean>();
	@Output() renderServiceList = new EventEmitter<boolean>();

	constructor(
		private adminService: AdminService, 
		private fb: FormBuilder,
		private utilities: Utilities
		) { }

	ngOnInit() {
		this.initForm();
	}

	/**
	 * [initForm Инициализация формы]
	 */
	initForm(): void {
	 	this.serviceForm = this.fb.group({
	 		'title': [this.service.title, Validators.required],
	 		'price': [this.service.price, Validators.required],
	 		'categoriesCtrl': this.buildCategoriesForm()
	 	});

	 	this.title = this.serviceForm.controls['title'];
	 	this.price = this.serviceForm.controls['price'];
	}

	get categoriesCtrl() {
	 	return this.serviceForm.get('categoriesCtrl') as FormArray;
	}

	/**
	 * [buildServicesForm создание формы checkbox услуг]
	 */
	buildCategoriesForm(){
	 	const formArray = this.utilities.makeFormCheckBoxArray(this.categories, this.service.categories);
	 	const arr = formArray.map(element =>{
	 		return this.fb.control(element);
	 	});

	 	return this.fb.array(arr);
	}

	/**
	 * [onServiceFormSubmit Обработка события отправки формы]
	 * @param {[type]} elements [элементы формы]
	 */
	onServiceFormSubmit(elements): void {
	 	let data = {};
	 	data['category'] = [];
	 	Object.keys(elements).forEach(key => {
	 		let element = elements[key];	 	

	 		switch (element.type) {
	 			case 'checkbox':	 		
	 				element.checked && data['category'].push(element.value);
	 				break;
	 			case 'text':
	 				data[element.id] = element.value;
	 				break;
	 			default:
	 				break;
	 		}
	 	});
	 	this.onEditService(data);
	 }

	/**
	* [onEditService Обновление данных услуги]
	* @param {[type]} data [данные формы]
	*/
	
	onEditService(data): void {				
		this.serviceForm.valid && this.adminService.editService(data, this.service.slug).subscribe(
	        result => {
	            this.closeModal(false);
	            this.renderServiceList.emit();
	        });
	}

	/**
	* [closeModal закрытие модального окна]
	* @param {boolean} switcher [переключатель видимости модального окна]
	*/
		closeModal(switcher: boolean): void {
	 	this.modalWindowToggle.emit(switcher);
	}
}