import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAddRoomComponent } from './form-add-room.component';

describe('FormAddRoomComponent', () => {
  let component: FormAddRoomComponent;
  let fixture: ComponentFixture<FormAddRoomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormAddRoomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormAddRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
