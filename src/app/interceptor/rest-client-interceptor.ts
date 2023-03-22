import {Injectable} from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import {Observable, throwError} from "rxjs";
import {environment} from "../../environments/environment";
import {TenantService} from "../service/tenant.service";
import {catchError} from "rxjs/operators";
import {MessagesService} from "../service/messages.service";
import {UserService} from "../service/user.service";

@Injectable()
export class RestClientInterceptor implements HttpInterceptor {

  baseUrl = environment.baseUrl;
  searchServicePath = environment.searchServicePath;

  constructor(
    private tenantService: TenantService,
    private http: HttpClient,
    private messageService: MessagesService,
    private userService: UserService
  ) {
    if (!this.baseUrl.endsWith("/")) {
      this.baseUrl = this.baseUrl + "/";
    }
    if (this.searchServicePath.length > 0 && !this.searchServicePath.endsWith("/")) {
      this.searchServicePath = this.searchServicePath + "/";
    }
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // if loaded assets, go to original URL
    if (!req.url.includes("assets") && !req.url.includes("v1/data/com/scheidtbachmann/phfa/iam/allow")) {
      req = req.clone({
        url: `${this.baseUrl}${this.searchServicePath}v1/${this.tenantService.tenant}/${req.url}`,
        setParams: { userName: this.userService.userName }
      });
    }

    return next.handle(req).pipe(
      // tap(_ => this.log('')),
      catchError((error: HttpErrorResponse) => {
        let errorMsg = '';
        let errorMsgLocalized = 'general.unexpectedRestError';

        if (error.error instanceof ErrorEvent) {
          console.error('This is client side error');
          errorMsg = `Error: ${error.error.message}`;
        } else {
          console.error('This is server side error');
          errorMsg = `Error Code: ${error.status},  Message: ${error.message}`;
        }

        console.error(errorMsg);
        this.messageService.showErrorMessageLocalized(errorMsgLocalized);
        return throwError(errorMsg);
      })
    );
  }
}
