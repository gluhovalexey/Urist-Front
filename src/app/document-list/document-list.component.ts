import { Component, OnInit, Inject } from '@angular/core';
import { Location } from '@angular/common';
import { UristService, DOCUMENT_WEB_PATH } from '../urist.service';
import { Document } from '../document.model';

@Component({
    selector: 'app-document-list',
    templateUrl: './document-list.component.html',
    styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {
    documents: Document;

    constructor(
        private uristService: UristService,
        private location: Location,
        @Inject(DOCUMENT_WEB_PATH) private webPath: string
        ) {}

    ngOnInit() {
        this.renderDocumentList();
    }

    /**
     * [renderDocumentList отображение списка документов]
     */
    renderDocumentList(): void {
        this.uristService.getDocumentList().subscribe(
            documents  => {
                this.documents = documents;
            }
            );
    }
    /**
     * [goBack обработка нажатия кнопки "Назад"]
     */
    goBack(): void {
        this.location.back();
    }

}
