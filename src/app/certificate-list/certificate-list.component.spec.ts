import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SertificateListComponent } from './sertificate-list.component';

describe('SertificateListComponent', () => {
  let component: SertificateListComponent;
  let fixture: ComponentFixture<SertificateListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SertificateListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SertificateListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
