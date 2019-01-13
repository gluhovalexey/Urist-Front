import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import { UristService, CERTIFICATE_WEB_PATH } from '../urist.service';
import { Certificate } from '../certificate.model';

@Component({
	selector: 'app-certificate-list',
	templateUrl: './certificate-list.component.html',
	styleUrls: ['./certificate-list.component.css']
})
export class CertificateListComponent implements OnInit {
	certificates: Certificate;	


	constructor(
		private uristService: UristService,
		@Inject(CERTIFICATE_WEB_PATH) private webPath: string
		) { }

	ngOnInit() {
		this.renderCertificatesList();
	}
  	/**
     * [renderCertificatesList отображение списка сертификатов]
     */
     renderCertificatesList(): void {
     	this.uristService.getCertificatesList().subscribe(
     		certificates  => {
     			this.certificates = certificates;
     		}
   		);
    }

}
