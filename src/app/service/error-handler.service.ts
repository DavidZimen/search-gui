import { Injectable } from '@angular/core';
import {MessagesService} from "./messages.service";
import {TranslateService} from "@ngx-translate/core";

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(
    private messageService: MessagesService,
    private translateService: TranslateService
  ) {
  }

  handleError(error: any) {
    console.error(error);
    this.messageService.showMessage('error', this.translateService.instant('general.unexpectedError'));
  }
}
