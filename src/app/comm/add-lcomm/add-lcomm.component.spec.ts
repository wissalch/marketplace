import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLcommComponent } from './add-lcomm.component';

describe('AddLcommComponent', () => {
  let component: AddLcommComponent;
  let fixture: ComponentFixture<AddLcommComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddLcommComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddLcommComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
