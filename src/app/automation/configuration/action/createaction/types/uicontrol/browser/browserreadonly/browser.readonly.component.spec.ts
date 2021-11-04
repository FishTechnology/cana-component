import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowserReadonlyComponent } from './browser.readonly.component';

describe('Browser.ReadonlyComponent', () => {
  let component: BrowserReadonlyComponent;
  let fixture: ComponentFixture<BrowserReadonlyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Browser.ReadonlyComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BrowserReadonlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
