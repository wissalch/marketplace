import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoriquefourComponent } from './historiquefour.component';

describe('HistoriquefourComponent', () => {
  let component: HistoriquefourComponent;
  let fixture: ComponentFixture<HistoriquefourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoriquefourComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoriquefourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
