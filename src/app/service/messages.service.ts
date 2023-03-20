import { Injectable } from '@angular/core';
import {Message, MessageService} from "primeng/api";
import {Subject} from "rxjs";
import {TranslateService} from "@ngx-translate/core";

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  messages: Message[] = [];
  messageNotificationChange: Subject<Message[]> = new Subject<Message[]>();
  errorToastShowMilis = 7000;
  successToastShowMilis = 3000;

  constructor(
    private messageService: MessageService,
    private translateService: TranslateService
  ) {
  }

  add(severity: string, message: string) {
    this.messages.push({severity: severity, summary: message, detail: ''});
  }

  clear() {
    this.messageService.clear();
  }

  showMessage(severity: string, message: string) {
    this.messageService.add({severity: severity, summary: message, detail: ''});
  }

  showMessageLocalized(severity: string, messageKey: string, detail?: string, life?: number, sticky?: boolean, closeable?: boolean) {
    this.messageService.add({
      severity: severity,
      summary: this.translateService.instant(messageKey),
      detail: detail !== undefined ? this.translateService.instant(detail) : detail,
      life: life,
      sticky: sticky,
      closable: closeable
    });
  }

  showErrorMessageLocalized(messageKey: string, detail ?: string, sticky ?: boolean, closeable ?: boolean) {
    this.showMessageLocalized("error", messageKey, detail, this.errorToastShowMilis, sticky, closeable);
  }

  showSuccessMessageLocalized(messageKey: string, detail ?: string, sticky ?: boolean, closeable ?: boolean) {
    this.showMessageLocalized("success", messageKey, detail, this.successToastShowMilis, sticky, closeable);
  }
}
