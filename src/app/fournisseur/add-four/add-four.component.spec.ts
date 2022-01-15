import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFourComponent } from './add-four.component';

describe('AddFourComponent', () => {
  let component: AddFourComponent;
  let fixture: ComponentFixture<AddFourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddFourComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
