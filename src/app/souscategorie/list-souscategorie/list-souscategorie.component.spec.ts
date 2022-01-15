import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSouscategorieComponent } from './list-souscategorie.component';

describe('ListSouscategorieComponent', () => {
  let component: ListSouscategorieComponent;
  let fixture: ComponentFixture<ListSouscategorieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListSouscategorieComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListSouscategorieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
