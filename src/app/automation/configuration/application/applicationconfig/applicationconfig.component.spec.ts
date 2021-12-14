import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationconfigComponent } from './applicationconfig.component';

describe('ApplicationconfigComponent', () => {
  let component: ApplicationconfigComponent;
  let fixture: ComponentFixture<ApplicationconfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplicationconfigComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationconfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
