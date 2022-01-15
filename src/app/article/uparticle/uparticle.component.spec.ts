import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UparticleComponent } from './uparticle.component';

describe('UparticleComponent', () => {
  let component: UparticleComponent;
  let fixture: ComponentFixture<UparticleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UparticleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UparticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
