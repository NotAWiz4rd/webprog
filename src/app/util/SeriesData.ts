import {MovieData} from "./MovieData";
import {SeasonData} from "./SeasonData";

export class SeriesData extends MovieData{
  seasons: SeasonData[] = [];
}
