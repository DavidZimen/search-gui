import {APP_INITIALIZER, ErrorHandler, Injector, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MessageModule} from "primeng/message";
import {MessagesModule} from "primeng/messages";
import {Bos30ComponentsPrimengModule} from "bos30-components-primeng";
import {TranslateLoader, TranslateModule, TranslateService} from "@ngx-translate/core";
import {RestClientInterceptor} from "./interceptor/rest-client-interceptor";
import {ToastModule} from "primeng/toast";
import {DialogModule} from "primeng/dialog";
import {ButtonModule} from "primeng/button";
import {ErrorHandlerService} from "./service/error-handler.service";
import {MessageService} from "primeng/api";
import {AppRoutingModule} from "./app-routing/app-routing.module";
import {SearchModule} from "./search/search.module";
import {ToolbarModule} from "./toolbar/toolbar.module";
import {TabMenuModule} from "primeng/tabmenu";
import {ApplicationInitializerFactory, HttpLoaderFactory} from "./trasnslation/translation.config";
import {LanguageService} from "./service/language.service";
import {UserService} from "./service/user.service";
import {ErrorPagesModule} from "./error-pages/error-pages.module";



@NgModule({
  declarations: [
    AppComponent,
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
    TabMenuModule,
    AppRoutingModule,
    SearchModule,
    ToolbarModule,
    ErrorPagesModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: ApplicationInitializerFactory,
      deps: [TranslateService, Injector, LanguageService, UserService],
      multi: true
    },
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
