import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderBlackComponent } from './header-black.component';

describe('HeaderBlackComponent', () => {
  let component: HeaderBlackComponent;
  let fixture: ComponentFixture<HeaderBlackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderBlackComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderBlackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
