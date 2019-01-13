import { Component, OnInit } from '@angular/core';
import {
	FormBuilder,
	FormGroup,
	Validators,
	AbstractControl,
} from '@angular/forms';

import { AdminService } from '../../admin.service';
import { UristService } from '../../urist.service';
import { CategoryList} from '../../category-list.model';
@Component({
	selector: 'app-category-create',
	templateUrl: './category-create.component.html',
	styleUrls: ['./category-create.component.css']
})
export class CategoryCreateComponent implements OnInit {
	categoryForm: FormGroup;
	categoryList: CategoryList[];    
	errorMsg: string;
	isModalWindowVisible: boolean;
	title: AbstractControl;
	category: CategoryList[];

	constructor(        
		private fb: FormBuilder,
		private adminService: AdminService,
		private uristService: UristService
		) 
	{
		this.categoryForm = this.fb.group({
			'title': [ '', Validators.required ]
		});

		this.title = this.categoryForm.controls['title'];
	}
	/**
	 * [ngOnInit инициализация компонента]
	 */
	ngOnInit() {
		this.renderCategoryList()
	}
	/**
	 * [onCategoryFormSubmit обработка нажатия кнопки сохранить]
	 * @param {[type]} elements [description]
	 */
	onCategoryFormSubmit(elements) {
		let data = {};
	 	Object.keys(elements).forEach(key => {
	 		let element = elements[key];	 	

	 		switch (element.type) {
	 			case 'text':
	 				data[element.id] = element.value;
	 				break;
	 			default:
	 				break;
	 	}
	 	});
	
 		this.onCreateCategory(data)
	}
	/**
	 * [onCreateCategory Создание категории]
	 * @param {Object} data [description]
	 */
	onCreateCategory(data: Object) {
        this.categoryForm.valid && this.adminService.createCategory(data).subscribe(data => {
            this.categoryForm.reset();
            this.renderCategoryList();
        });
    }

	/**
	 * [renderCategoryList Получение списка категорий]
	 */
	renderCategoryList(): void {
		this.errorMsg = null;
		this.uristService.getCategoryList().subscribe(
			categoryList  => {
				this.categoryList = categoryList;
			},
			error =>
			{
				this.errorMsg = error;
				this.categoryList = null;
			});
	}

	/**
	 * [onEditCategory обработка нажатия кнопки редактировать]
	 * @param {boolean}        switcher [description]
	 * @param {CategoryList[]} category [description]
	 */
	onEditCategory(switcher: boolean, category: CategoryList[]) {
		this.modalWindowToggle(switcher);
        this.category = category ;
	}

	/**
	 * [onDeleteCategory обработка нажатия кнопки удалить]
	 * @param {[type]} slug [slug идентификатор]
	 */
	onDeleteCategory(slug) {
		this.adminService.deleteCategory(slug).subscribe(result => {
			this.renderCategoryList();
		});
	}

	/**
     * [modalWindowToggle переключатель состояния модального окна]
     * @param {boolean} switcher [флаг переключения]
     */
    modalWindowToggle(switcher: boolean) {
        this.isModalWindowVisible = switcher;
    }
}
