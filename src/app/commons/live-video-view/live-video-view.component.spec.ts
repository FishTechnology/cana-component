import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveVideoViewComponent } from './live-video-view.component';

describe('LiveVideoViewComponent', () => {
  let component: LiveVideoViewComponent;
  let fixture: ComponentFixture<LiveVideoViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LiveVideoViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveVideoViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
