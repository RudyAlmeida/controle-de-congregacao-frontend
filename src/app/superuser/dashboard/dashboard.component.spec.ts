import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperUserDashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  let component: SuperUserDashboardComponent;
  let fixture: ComponentFixture<SuperUserDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuperUserDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuperUserDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
