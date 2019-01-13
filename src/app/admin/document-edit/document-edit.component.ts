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

import { Document } from '../../document.model';
import { CategoryList } from '../../category-list.model';
import { AdminService } from '../../admin.service';
import { Utilities } from '../utilities';


@Component({
	selector: 'app-document-edit',
	templateUrl: './document-edit.component.html',
	styleUrls: ['./document-edit.component.css']
})
export class DocumentEditComponent implements OnInit {
	fileForm: FormGroup;
	fileName: AbstractControl;
	@Input() categories: CategoryList[];
	@Input() document: Document;
	@Output() modalWindowToggle = new EventEmitter<boolean>();
	@Output() renderDocumentList = new EventEmitter<boolean>();

	
	constructor(
		private adminService: AdminService, 
		private fb: FormBuilder,
		private utilities: Utilities
		) {}

	/**
	 * [ngOnInit Событие при инициализации компонента]
	 */
	ngOnInit() {
	 	this.initForm();
	}
	/**
	 * [initForm Инициализация формы]
	 */
	initForm(): void {
	 	this.fileForm = this.fb.group({
	 		'name': [this.document.name, Validators.required], 
	 		'categoriesCtrl': this.buildCategoriesForm()
	 	});

	 	this.fileName = this.fileForm.controls['name'];
	}

	get categoriesCtrl() {
	 	return this.fileForm.get('categoriesCtrl') as FormArray;
	}
	/**
	 * [buildCategoriesForm создание формы checkbox]
	 */
	buildCategoriesForm(){
		console.log(this.document)
	 	const formArray = this.utilities.makeFormCheckBoxArray(this.categories, this.document.categories);
	 	const arr = formArray.map(element =>{
	 		return this.fb.control(element);
	 	});

	 	return this.fb.array(arr);
	}
	/**
	 * [onFormFileSubmith Обработка события отправки формы]
	 * @param {[type]} elements [элементы формы]
	 */
	onFormFileSubmith(elements): void {
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
	
 		this.editDocument(data)
	}
	/**
	 * [editDocument Обновленеи данных документа]
	 * @param {[type]} data [данные формы]
	 */
	private editDocument(data): void {
				
		this.fileForm.valid && this.adminService.editDocument(data, this.document.slug).subscribe(
            result => {
                this.closeModal(false);
                this.renderDocumentList.emit();
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
