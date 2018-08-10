import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WinnerviewComponent } from './winnerview.component';

describe('WinnerviewComponent', () => {
  let component: WinnerviewComponent;
  let fixture: ComponentFixture<WinnerviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WinnerviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WinnerviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
