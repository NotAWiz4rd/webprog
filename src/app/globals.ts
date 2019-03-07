import {Language} from "./util/Language";
import {StaticText} from "./util/StaticText";

export class Globals {
  staticTexts: StaticText[] | undefined;
  language: Language = Language.ENGLISH;
}
