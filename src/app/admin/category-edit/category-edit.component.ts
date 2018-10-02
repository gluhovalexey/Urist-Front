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
import { AdminService } from '../../admin.service';
import { Category } from '../../category.model';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.css']
})
export class CategoryEditComponent implements OnInit {

	categoryForm: FormGroup;
	title: AbstractControl;
	@Input() category: Category;
	@Output() modalWindowToggle = new EventEmitter<boolean>();
	@Output() renderCategoryList = new EventEmitter<boolean>();

  	constructor(
		private adminService: AdminService, 
		private fb: FormBuilder,
		) {}
  	/**
  	 * [ngOnInit инициализация компонента]
  	 */
  	ngOnInit() {
  		this.initForm();
  	}

  	/**
	 * [initForm Инициализация формы]
	 */
	initForm(): void {
	 	this.categoryForm = this.fb.group({
	 		'title': [this.category.title, Validators.required]	 		
	 	});
	 	this.title = this.categoryForm.controls['title'];
	}

	/**
	 * [onCategoryFormSubmit обработка события нажатия кнопки сохранить]
	 * @param {[type]} elements [элементы формы]
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
	
 		this.onEditCategory(data)
	}

	private onEditCategory(data): void {
				
	this.categoryForm.valid && this.adminService.editCategory(data, this.category.slug).subscribe(
        result => {        	
            this.closeModal(false);
            this.renderCategoryList.emit();
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