import { Component, OnInit } from '@angular/core';
import {
	FormBuilder,
	FormGroup,
	Validators,
	AbstractControl,
	FormArray
} from '@angular/forms';
import { AdminService } from '../../admin.service';
import { UristService } from '../../urist.service';
import { CategoryList} from '../../category-list.model';
import { Service } from '../../service.model'


@Component({
	selector: 'app-service-create',
	templateUrl: './service-create.component.html',
	styleUrls: ['./service-create.component.css']
})
export class ServiceCreateComponent implements OnInit {
	
	serviceForm: FormGroup;
	title: AbstractControl;
	price: AbstractControl;
	categories: CategoryList[];
	services: Service;
	service: Service;
	errorMsg: string = null;
	isModalWindowVisible: boolean;

	
	constructor(
		private fb: FormBuilder,
		private adminService: AdminService,
		private uristService: UristService
		) {}

	/**
	 * [ngOnInit инициализация компонента]
	 */
	ngOnInit() {
		this.initForm();
		this.renderServiceList();
	}

	/**
	 * [initForm инициализация формы]
	 */
	initForm(){
		this.errorMsg = null;
		this.uristService.getCategoryList().subscribe(
			(categories: CategoryList[]) => 
			{
				this.categories = categories;
				this.serviceForm = this.fb.group({
					'title': [ '', Validators.required ],
					'price': [ '', Validators.required ],
					'categoriesCtrl': this.buildCategoriesForm(categories)
				});

				this.title = this.serviceForm.controls['title'];
				this.price = this.serviceForm.controls['price'];
			},
			error =>
			{
				this.errorMsg = error;
				this.categories = null;
			});
	}

	get categoriesCtrl() {
		return this.serviceForm.get('categoriesCtrl') as FormArray;
	}

	/**
	 * [buildCategoriesForm создание формы с категориями]
	 * @param {[type]} categories [список категорий]
	 */
	buildCategoriesForm(categories) {         
		const arr = categories.map(element =>{
			return this.fb.control(false);
		});

		return this.fb.array(arr);
	}

	/**
	 * [onServiceFormSubmith обработка нажатия на кнопку сохранить]
	 * @param {[type]} elements [элементы формы]
	 */
	onServiceFormSubmith(elements): void {
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
	
 		this.onCreateService(data)
	
	}

	/**
	 * [onCreateService создание новой услуги]
	 * @param {[type]} data [данные новой услуги]
	 */
	onCreateService(data) {
		this.serviceForm.valid && this.adminService.createService(data).subscribe(data => {
            this.serviceForm.reset();
            this.renderServiceList();
        });
	}

	/**
     * [onEditService обработка нажатия кнопки редактирование услуги]
     * @param {boolean}  switcher [переключатель состояния модального окна]
     * @param {Service} service [сущность услуги]
     */
    onEditService(switcher: boolean, service: Service) {
        this.modalWindowToggle(switcher);
        this.service = service;
    }

    /**
     * [modalWindowToggle переключатель модального окна]
     * @param {boolean} switcher [переключатель состояния модального окна]
     */
    modalWindowToggle(switcher: boolean) {
        this.isModalWindowVisible = switcher;
    }

	/**
     * [onDeleteService обработка нажатия кнопки удалить на услуге]
     * @param {[type]} slug [slug идентификатор]
     */
    onDeleteService(slug): void {
        this.adminService.deleteService(slug).subscribe(
            result => {
                this.renderServiceList();
            });
    }

	/**
	 * [renderServiceList получение сущностей услуг]
	 */
	renderServiceList() {
		this.errorMsg = null;
		this.adminService.getServiceEntityList().subscribe(
			services  => {
				this.services = services;
			},
			error =>
			{
				this.errorMsg = error;
				this.services = null;
			});
	}
}
