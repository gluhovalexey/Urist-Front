import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VedComponent } from './ved.component';

describe('VedComponent', () => {
  let component: VedComponent;
  let fixture: ComponentFixture<VedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
