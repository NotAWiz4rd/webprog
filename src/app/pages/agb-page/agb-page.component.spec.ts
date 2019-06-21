import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgbPageComponent } from './agb-page.component';

describe('AgbPageComponent', () => {
  let component: AgbPageComponent;
  let fixture: ComponentFixture<AgbPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgbPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgbPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
