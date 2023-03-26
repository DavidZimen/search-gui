import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {LOCATION_INITIALIZED} from "@angular/common";
import {TranslateService} from "@ngx-translate/core";
import {Injector} from "@angular/core";
import {LanguageService} from "../service/language.service";
import {UserService} from "../service/user.service";


export function HttpLoaderFactory(httpClient: HttpClient) {
  let prefix = "/assets/i18n/";
  if (environment.production) {
    prefix = "/search-gui" + prefix;
  }
  return new TranslateHttpLoader(httpClient, prefix);
}

export function ApplicationInitializerFactory(
  translate: TranslateService, injector: Injector, languageService: LanguageService, userService: UserService) {
  return async () => {
    await injector.get(LOCATION_INITIALIZED, Promise.resolve(null));

    const defaultLanguage = languageService.EN_DEVEL;
    translate.addLangs([languageService.EN_GB, languageService.DE_DE]);
    translate.setDefaultLang(defaultLanguage);
    try {
     await loadLanguage(languageService, userService);
     console.log('Selected: ' + translate.currentLang);
     console.log('Default: ' + translate.defaultLang);
    } catch (err) {
      console.log(err);
    }
  };
}

async function loadLanguage(languageService: LanguageService, userService: UserService) {
  let userLang = userService.locale;

  if (environment.production) {
    if (userLang.startsWith("de")) {
      await languageService.selectLanguage(languageService.languageDE);
    } else {
      await languageService.selectLanguage(languageService.languageEN);
    }
  } else {
    await languageService.selectLanguage(languageService.languageEN);
  }
}
