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
	Validators,
	AbstractControl
} from '@angular/forms';
import { AdminService } from '../../admin.service';
import { Certificate } from '../../certificate.model';

@Component({
	selector: 'app-certificate-edit',
	templateUrl: './certificate-edit.component.html',
	styleUrls: ['./certificate-edit.component.css']
})
export class CertificateEditComponent implements OnInit {
	certificateForm: FormGroup;
	name: AbstractControl;
	@Input() certificate: Certificate;
	@Output() modalWindowToggle = new EventEmitter<boolean>();
	@Output() renderCertificateList = new EventEmitter<boolean>();

	constructor(
		private adminService: AdminService, 
		private fb: FormBuilder,
		) {}

	ngOnInit() {
		this.initForm();
	}
	/**
	 * [initForm description]
	 */
	initForm(): void {
	 	this.certificateForm = this.fb.group({
	 		'name': [ this.certificate.name, Validators.required ]
	 	});

	 	this.name = this.certificateForm.controls['name'];
	}
	
	/**
	 * [onCertificateFormSubmit description]
	 * @param {[type]} elements [description]
	 */
	onCertificateFormSubmit(elements) {
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
	 	this.onEditCertificate(data);
	}

	/**
	 * 
	 * [onEditCertificate изменение сертификата]
	 * @param {[type]} data [данные для изменения]
	 */
	 private onEditCertificate(data): void {

	 	this.certificateForm.valid && this.adminService.editCertificate(data, this.certificate.slug).subscribe(
	 		result => {        	
	 			this.closeModal(false);
	 			this.renderCertificateList.emit();
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