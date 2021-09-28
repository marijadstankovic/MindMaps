import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDocumentsPageComponent } from './list-documents-page.component';

describe('ListDocumentsPageComponent', () => {
  let component: ListDocumentsPageComponent;
  let fixture: ComponentFixture<ListDocumentsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListDocumentsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListDocumentsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
