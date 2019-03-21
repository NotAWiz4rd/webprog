import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieSuggestionsComponent } from './movie-suggestions.component';

describe('MovieSuggestionsComponent', () => {
  let component: MovieSuggestionsComponent;
  let fixture: ComponentFixture<MovieSuggestionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovieSuggestionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieSuggestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
