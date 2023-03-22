import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {User} from "../dto/user";

@Injectable({
  providedIn: 'root'
})
export class UserService {
    private USER_LOCAL_STORAGE_NAME = "user";
    private CURRENT_LOCALE_LOCAL_STORAGE_NAME = "currentLocale";

    userName: string;
    roles: string[];
    locale: string;

    constructor() {
      if (environment.mockPm) {
        this.roles = environment.mockPmUserRoles;
        this.locale = environment.mockPmUserLocale;
        this.userName = environment.mockPmUser;
      } else {
        this.loadUserWithRoles();
        this.loadLocale();
      }
    }

    public loadUserWithRoles(): void {
      let userString = localStorage.getItem(this.USER_LOCAL_STORAGE_NAME);
      if (userString != null) {
        let user = JSON.parse(userString) as User;
        this.roles = JSON.parse(user.roles);
        this.userName = user.username;
      }
    }

    public loadLocale(): void {
      let localeString = localStorage.getItem(this.CURRENT_LOCALE_LOCAL_STORAGE_NAME);
      if  (localeString != null) {
        this.locale  = localeString;
      }
    }
}
