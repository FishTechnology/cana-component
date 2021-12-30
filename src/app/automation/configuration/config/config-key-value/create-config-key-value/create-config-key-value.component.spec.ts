import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateConfigKeyValueComponent } from './create-config-key-value.component';

describe('CreateConfigKeyValueComponent', () => {
  let component: CreateConfigKeyValueComponent;
  let fixture: ComponentFixture<CreateConfigKeyValueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateConfigKeyValueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateConfigKeyValueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
