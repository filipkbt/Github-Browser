import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersBrowserComponent } from './users-browser.component';

describe('UsersBrowserComponent', () => {
  let component: UsersBrowserComponent;
  let fixture: ComponentFixture<UsersBrowserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersBrowserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersBrowserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
