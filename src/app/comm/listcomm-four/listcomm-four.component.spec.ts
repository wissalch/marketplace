import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListcommFourComponent } from './listcomm-four.component';

describe('ListcommFourComponent', () => {
  let component: ListcommFourComponent;
  let fixture: ComponentFixture<ListcommFourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListcommFourComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListcommFourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
