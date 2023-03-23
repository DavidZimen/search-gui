import {ErrorHandler, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MessageModule} from "primeng/message";
import {MessagesModule} from "primeng/messages";
import {Bos30ComponentsPrimengModule} from "bos30-components-primeng";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {environment} from "../environments/environment";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {RestClientInterceptor} from "./interceptor/rest-client-interceptor";
import {ToastModule} from "primeng/toast";
import {DialogModule} from "primeng/dialog";
import {ButtonModule} from "primeng/button";
import {ErrorHandlerService} from "./service/error-handler.service";
import {MessageService} from "primeng/api";
import {AppRoutingModule} from "./app-routing/app-routing.module";

export function HttpLoaderFactory(httpClient: HttpClient) {
  let prefix = "/assets/i18n/";
  if (environment.production) {
    prefix = "/search-gui" + prefix;
  }
  return new TranslateHttpLoader(httpClient, prefix);
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MessageModule,
    MessagesModule,
    Bos30ComponentsPrimengModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    ToastModule,
    DialogModule,
    ButtonModule,
    AppRoutingModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RestClientInterceptor,
      multi: true
    },
    {
      provide: ErrorHandler,
      useClass: ErrorHandlerService
    },
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
