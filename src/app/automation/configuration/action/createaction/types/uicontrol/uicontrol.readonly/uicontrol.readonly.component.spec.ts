import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiControlReadonlyComponent } from './uicontrol.readonly.component';

describe('Uicontrol.ReadonlyComponent', () => {
  let component: UiControlReadonlyComponent;
  let fixture: ComponentFixture<UiControlReadonlyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UiControlReadonlyComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UiControlReadonlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
