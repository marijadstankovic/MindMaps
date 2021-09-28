import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMindmapsComponent } from './create-mindmaps.component';

describe('CreateMindmapsComponent', () => {
  let component: CreateMindmapsComponent;
  let fixture: ComponentFixture<CreateMindmapsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateMindmapsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateMindmapsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
