import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListLcommComponent } from './list-lcomm.component';

describe('ListLcommComponent', () => {
  let component: ListLcommComponent;
  let fixture: ComponentFixture<ListLcommComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListLcommComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListLcommComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
