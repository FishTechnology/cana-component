import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateApplicationConfigComponent } from './create-application-config.component';

describe('CreateApplicationConfigComponent', () => {
  let component: CreateApplicationConfigComponent;
  let fixture: ComponentFixture<CreateApplicationConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateApplicationConfigComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateApplicationConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
