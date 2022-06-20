import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterBlueComponent } from './footer-blue.component';

describe('FooterBlueComponent', () => {
  let component: FooterBlueComponent;
  let fixture: ComponentFixture<FooterBlueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FooterBlueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterBlueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
