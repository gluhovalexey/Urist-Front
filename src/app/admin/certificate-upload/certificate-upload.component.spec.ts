import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificateUploadComponent } from './certificate-upload.component';

describe('CertificateUploadComponent', () => {
  let component: CertificateUploadComponent;
  let fixture: ComponentFixture<CertificateUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CertificateUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CertificateUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
