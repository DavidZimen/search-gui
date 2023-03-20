import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {TenantService} from "./tenant.service";
import {environment} from "../../environments/environment";
import {BehaviorSubject, Observable} from "rxjs";
import {UserService} from "./user.service";
import {LanguageService} from "./language.service";
import {Permission} from "../dto/permission";

@Injectable({
  providedIn: 'root'
})
export class PermissionService {

    private PERMISSION_PATH = 'v1/data/com/scheidtbachmann/phfa/iam/allow';  // URL to web api
    private PRODUCTS_APP_NAME = "search-gui";
    private readonly opaUrl: string;

    constructor(
      private http: HttpClient,
      private languageService: LanguageService,
      private tenantService: TenantService,
      private userService: UserService
    ) {
      this.opaUrl =  environment.opaUrl;
      if (!this.opaUrl.endsWith("/")) {
        this.opaUrl = this.opaUrl + "/";
      }
    }

    loadPermissionAssignment(permission: string): Observable<{result: boolean}> {
      if (environment.mockOpa) {
        return new BehaviorSubject({result: true});
      }

      let opaInput = {
        input: {
          permission: permission,
          app: this.PRODUCTS_APP_NAME,
          tenant: this.tenantService.tenant,
          roles: this.userService.roles
        }
      };
      return this.http.post<{result: boolean}>(this.opaUrl + this.PERMISSION_PATH, opaInput);
    }

    checkPermission(permission: string, permissions: Permission[]): boolean {
      let foundPermission = permissions.find(p => p.key === permission);
      if (foundPermission !== undefined) {
        return foundPermission.value;
      } else {
        return false;
      }
    }
}
