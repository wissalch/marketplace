import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSouscategorieComponent } from './add-souscategorie.component';

describe('AddSouscategorieComponent', () => {
  let component: AddSouscategorieComponent;
  let fixture: ComponentFixture<AddSouscategorieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSouscategorieComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSouscategorieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
