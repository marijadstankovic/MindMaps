import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomDetailsDialogComponent } from './room-details-dialog.component';

describe('RoomDetailsDialogComponent', () => {
  let component: RoomDetailsDialogComponent;
  let fixture: ComponentFixture<RoomDetailsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoomDetailsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
