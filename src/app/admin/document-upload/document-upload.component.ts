import { Component, OnInit, Inject } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    Validators,
    AbstractControl,
    FormArray
} from '@angular/forms';
import { AdminService } from '../../admin.service';
import { UristService, DOCUMENT_WEB_PATH } from '../../urist.service';
import { CategoryList} from '../../category-list.model';
import { Document } from '../../document.model';

@Component({
    selector: 'app-document-upload',
    templateUrl: './document-upload.component.html',
    styleUrls: ['./document-upload.component.css']
})
export class DocumentUploadComponent implements OnInit {
    fileForm: FormGroup;
    documents: Document[];
    document: Document = null;
    categories: CategoryList[];
    errorMsg: string = null;
    isModalWindowVisible: boolean;
    file: AbstractControl;
    fileName: AbstractControl

    constructor(
        private fb: FormBuilder,
        private adminService: AdminService,
        private uristService: UristService,
        @Inject(DOCUMENT_WEB_PATH) private webPath: string
        ) {}

    ngOnInit() {
        this.initForm();
        this.renderDocumentList();
    }
    initForm(){
        this.errorMsg = null;
        this.uristService.getCategoryList().subscribe(
            (categories: CategoryList[]) => 
            {
                this.categories = categories;
                this.fileForm = this.fb.group({
                    'file': [ '', Validators.required ],
                    'fileName': [ '', Validators.required ],
                    'categoriesCtrl': this.buildCategoriesForm(categories)
                });

                this.file = this.fileForm.controls['file'];
                this.fileName = this.fileForm.controls['fileName'];

            },
            error =>
            {
                this.errorMsg = error;
                this.categories = null;
            });
    }

        get categoriesCtrl() {
         return this.fileForm.get('categoriesCtrl') as FormArray;
    }
    /**
     * [buildCategoriesForm Создание форм с checkbox категориями]
     * @param {[type]} categories [массив с категориями]
     */
    buildCategoriesForm(categories){         
         const arr = categories.map(element =>{
             return this.fb.control(false);
         });

         return this.fb.array(arr);
    }
    /**
     * [onFileChange Событие выбора файла]
     * @param {[type]} event [событие]
     */
    onFileChange(event) {       
        let origFileName = event.target.files && event.target.files[0].name;
        let extensionIndex = origFileName && origFileName.lastIndexOf('.');
        let fileName = ( origFileName && extensionIndex && origFileName.substring(0, extensionIndex) ) || null;

        this.fileName.setValue(fileName);
    }

    /**
     * [onFormFileSubmith Обрабочтик нажатия кнопки сохранить]
     * @param {[type]} elements [элементы формы]
     */
    onFormFileSubmith(elements) {
        let fileToUpload = elements && elements.file.files.item(0)
        let fileName = ( elements.fileName && elements.fileName.value);
        let documentCategory = [];

        Object.keys(elements).forEach( key => {
            let element = elements[key];
            element.type === 'checkbox' && element.checked && documentCategory.push(element.value);
        });
        this.uploadFile(fileToUpload, fileName, documentCategory)
    }

    uploadFile(fileToUpload, fileName, documentCategory) {
        this.fileForm.valid && this.adminService.uploadDocument(fileToUpload, fileName, documentCategory).subscribe(data => {
            this.fileForm.reset();
            this.renderDocumentList();
        });
    }

    renderDocumentList(): void {
        this.errorMsg = null;
        this.adminService.getDocumentEntityList().subscribe(
            documents  => {
                this.documents = documents;
            },
            error =>
            {
                this.errorMsg = error;
                this.documents = null;
            });
    }

    // renderCategoriesList(): void {
    //     this.errorMsg = null;
    //     this.uristService.getCategoryList().subscribe(
    //         (categories: CategoryList[]) => 
    //         {
    //             this.categories = categories;
    //         },
    //         error =>
    //         {
    //             this.errorMsg = error;
    //             this.categories = null;
    //         });
    // }

    /**
     * [onDeleteDocument обработка нажатия кнопки удалить на документе]
     * @param {[type]} slug [slug идентификатор]
     */
    onDeleteDocument(slug): void {
        this.adminService.deleteDocument(slug).subscribe(
            result => {
                this.renderDocumentList();
            });
    }
    
    /**
     * [onEditDocument обработка нажатия кнопки редактирование документа]
     * @param {boolean}  switcher [переключатель состояния модального окна]
     * @param {Document} document [сущность документа]
     */
    onEditDocument(switcher: boolean, document: Document) {
        this.modalWindowToggle(switcher);
        this.document = document;
    }
    /**
     * [modalWindowToggle переключатель модального окна]
     * @param {boolean} switcher [переключатель состояния модального окна]
     */
    modalWindowToggle(switcher: boolean) {
        this.isModalWindowVisible = switcher;
    }
}
