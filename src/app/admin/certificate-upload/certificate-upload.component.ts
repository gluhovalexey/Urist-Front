import { Component, OnInit } from '@angular/core';
import {
	FormBuilder,
	FormGroup,
	Validators,
	AbstractControl
} from '@angular/forms';
import { AdminService } from '../../admin.service';
import { UristService } from '../../urist.service';
import { Certificate } from '../../certificate.model';

@Component({
	selector: 'app-certificate-upload',
	templateUrl: './certificate-upload.component.html',
	styleUrls: ['./certificate-upload.component.css']
})
export class CertificateUploadComponent implements OnInit {
	certificateForm: FormGroup;
	public certificates: Certificate;
    public certificate: Certificate;
	public errorMsg;
	isModalWindowVisible: boolean;
	file: AbstractControl;
	fileName: AbstractControl;

	constructor(
		private fb: FormBuilder,
		private adminService: AdminService,
		private uristService: UristService
		) {
		this.certificateForm = this.fb.group({
			'file': [ '', Validators.required ],
			'fileName': [ '', Validators.required ]
		});

		this.file = this.certificateForm.controls['file'];
		this.fileName = this.certificateForm.controls['fileName'];
	}

	ngOnInit() {
        this.renderCertificateList();
	}

	/**
    * [onFormFileSubmith Обработчик нажатия кнопки сохранить]
    * @param {[type]} elements [элементы формы]
    */
    onCertificateFormSubmit(elements) {
    	let fileToUpload = elements && elements.file.files.item(0)
    	let fileName = ( elements.fileName && elements.fileName.value);

    	this.uploadFile(fileToUpload, fileName)
    }
    /**
     * [uploadFile Загрузка файла на сервер]
     * @param {[type]} fileToUpload [description]
     * @param {[type]} fileName     [description]
     */
    uploadFile(fileToUpload, fileName) {
    	this.certificateForm.valid && this.adminService.uploadCertificate(fileToUpload, fileName).subscribe(data => {
    		this.certificateForm.reset();
    		this.renderCertificateList();
    	});
    }
   	/**
    * [renderCertificateList Получить список сертификатов]
    */
    renderCertificateList() {
    	this.errorMsg = null;
    	this.uristService.getCertificatesList().subscribe(
    		certificates  => {
    			this.certificates = certificates;
    		},
    		error =>
    		{
    			this.errorMsg = error;
    			this.certificates = null;
    		});
    }
     /**
     * [onDeleteCertificate обработка нажатия кнопки удалить на сертификате]
     * @param {[type]} slug [slug идентификатор]
     */
    onDeleteCertificate(slug): void {
        this.adminService.deleteCertificate(slug).subscribe(
            result => {
                this.renderCertificateList();
            });
    }
    
    /**
     * [onEditCertificate обработка нажатия кнопки редактирование сертификата]
     * @param {boolean}  switcher [переключатель состояния модального окна]
     * @param {Certificate} certificate [сущность сертификата]
     */
    onEditCertificate(switcher: boolean, certificate: Certificate) {
        this.modalWindowToggle(switcher);
        this.certificate = certificate;
    }
    /**
     * [modalWindowToggle переключатель модального окна]
     * @param {boolean} switcher [переключатель состояния модального окна]
     */
    modalWindowToggle(switcher: boolean) {
        this.isModalWindowVisible = switcher;
    }
}
