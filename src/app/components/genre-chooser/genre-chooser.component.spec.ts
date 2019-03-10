import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenreChooserComponent } from './genre-chooser.component';

describe('GenreChooserComponent', () => {
  let component: GenreChooserComponent;
  let fixture: ComponentFixture<GenreChooserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenreChooserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenreChooserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
