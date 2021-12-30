import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigKeyValueComponent } from './config-key-value.component';

describe('ConfigKeyValueComponent', () => {
  let component: ConfigKeyValueComponent;
  let fixture: ComponentFixture<ConfigKeyValueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfigKeyValueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigKeyValueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
