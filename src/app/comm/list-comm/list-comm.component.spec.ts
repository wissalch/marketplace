import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCommComponent } from './list-comm.component';

describe('ListCommComponent', () => {
  let component: ListCommComponent;
  let fixture: ComponentFixture<ListCommComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListCommComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCommComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
