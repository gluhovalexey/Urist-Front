import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import { Location } from '@angular/common';
import { UristService, WEB_PATH } from '../urist.service';
import { Document } from './document.model';

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
    @Inject(WEB_PATH) private webPath: string
  ) {}

  ngOnInit() {
    this.renderDocumentList();
  }

  renderDocumentList(): void {
    this.uristService.getDocumentList().subscribe(
      documents  => {
          this.documents = documents;
      }
    );
  }
  goBack(): void {
    this.location.back();
  }

}
