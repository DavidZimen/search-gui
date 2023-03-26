import { Injectable } from '@angular/core';
import {PrimeNGConfig} from "primeng/api";
import {TranslateService} from "@ngx-translate/core";
import {Language} from "../dto/language";

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  readonly EN_GB: string = "en_gb";
  readonly DE_DE: string = "de_de";
  readonly EN_DEVEL: string = "en_devel";

  readonly languageEN = new Language("English", "en", "GB");
  readonly languageDE = new Language("Deutsch", "de", "DE");

  private _selectedLanguage: Language = this.languageEN;

  constructor(
    private config: PrimeNGConfig,
    private translateService: TranslateService
  ) {
  }

  getLanguages(): Language[] {
    return [this.languageEN, this.languageDE];
  }

  async selectLanguage(selectedLanguage: Language) {
    this._selectedLanguage = selectedLanguage;

    if(selectedLanguage === this.languageEN) {
      await this.translateService.use(this.EN_GB).toPromise();
    } else if(selectedLanguage === this.languageDE) {
      await this.translateService.use(this.DE_DE).toPromise();
    } else {
      console.log("Unknown language: " + selectedLanguage.language + "-" + selectedLanguage.country);
    }

    this.translateService.get('primeng').subscribe(res => {
      this.config.setTranslation(res);
    });
  }

  get selectedLanguage(): Language {
    return this._selectedLanguage;
  }
}
