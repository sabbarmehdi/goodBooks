import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleBookComponent } from './single-book.component';

describe('SingleFormComponent', () => {
  let component: SingleBookComponent;
  let fixture: ComponentFixture<SingleBookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleBookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
