import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class TenantService {

  tenant: string;

  constructor() {
    if (environment.mockPm) {
      this.tenant = environment.mockPmTenant;
    } else {
      this.tenant = this.getCookie("pm_tenant_id");
    }
  }

  public getCookie(name: string) {
    let cookieArray: Array<string> = document.cookie.split(';');
    let cookieName = `${name}=`;
    let c: string;

    for (let i: number = 0; i < cookieArray.length; i += 1) {
      c = cookieArray[i].replace(/^\s+/g, '');
      if (c.indexOf(cookieName) == 0) {
        return c.substring(cookieName.length, c.length);
      }
    }
    return '';
  }
}
