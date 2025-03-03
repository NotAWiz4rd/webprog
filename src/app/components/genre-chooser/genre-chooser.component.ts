import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Genre} from "../../util/Genre";
import {LanguageService} from "../../services/language.service";
import {Globals} from "../../util/Globals";

@Component({
  selector: 'app-genre-chooser',
  templateUrl: './genre-chooser.component.html',
  styleUrls: ['./genre-chooser.component.css']
})

// this component has an array of genres and makes it possible to search by genres
// by switching to the chosen one
export class GenreChooserComponent implements OnInit {
  @Output()
  genreChange: EventEmitter<string> = new EventEmitter();

  isOpen: boolean = false;
  genres: string[] = [];

  constructor(public languageService: LanguageService,
              public globals: Globals) {
    this.createGenreArray();
  }

  ngOnInit() {
  }

  toggleVisibility() {
    this.isOpen = !this.isOpen;
  }

  onGenreChange(genreString: string) {
    this.toggleVisibility();
    console.log('Changed genre to ' + genreString);
    this.genreChange.emit(genreString);
  }

  private createGenreArray() {
    this.genres = [Genre.ACTION, Genre.COMEDIES, Genre.SCIFI, Genre.ROMANCE, Genre.HORROR, Genre.FANTASY, Genre.ANIMATIION, Genre.DRAMAS, Genre.DOCUMENTARIES, Genre.SERIES]
  }
}
