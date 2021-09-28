import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeNameMindmapComponent } from './change-name-mindmap.component';

describe('ChangeNameMindmapComponent', () => {
  let component: ChangeNameMindmapComponent;
  let fixture: ComponentFixture<ChangeNameMindmapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeNameMindmapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeNameMindmapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
