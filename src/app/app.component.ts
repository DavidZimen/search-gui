import {Component, OnDestroy, OnInit} from '@angular/core';
import {MenuItem, Message} from "primeng/api";
import {Subscription} from "rxjs";
import {MessagesService} from "./service/messages.service";
import {LanguageService} from "./service/language.service";
import {UserService} from "./service/user.service";
import {PermissionService} from "./service/permission.service";
import {TranslateService} from "@ngx-translate/core";
import {SearchHistoryItem} from "./dto/search-history-item";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  private SEARCH_GUI_READ_PERMISSIONS: string = "application-gui_view";
  title = 'search-gui';
  messages: Message[] = [];
  messageSubscription: Subscription;
  hasPermissions: boolean = true;
  components!: MenuItem[];
  selectedItem: MenuItem;
  searchHistoryItems: SearchHistoryItem[] = [];
  searchHistorySubscription: Subscription;

  constructor(
    private messageService: MessagesService,
    private languageService: LanguageService,
    private translateService: TranslateService,
    private userService: UserService,
    private permissionService: PermissionService
  ) {

  }

  ngOnInit(): void {
    this.permissionService.loadPermissionAssignment(this.SEARCH_GUI_READ_PERMISSIONS).subscribe(
      (result) => {
        this.hasPermissions = result.result;
      }, () => {
        this.hasPermissions = false;
      }
    );

    this.subscribeToMessageNotifications();
    this.fillTabMenu();
  }

  ngOnDestroy(): void {
    this.messageSubscription.unsubscribe();
  }

  private subscribeToMessageNotifications(): void {
    this.messageSubscription = this.messageService.messageNotificationChange
      .subscribe((notification: Message[]) => {
        this.messages = [];
        if (notification !== undefined) {
          notification.forEach(element => {
            this.messages.push(element);
          });
        }
      });
  }

  fillTabMenu(): void {
    this.components = [
      { label: this.translateService.instant('search.searchResultsTab'), routerLink: 'search' },
      { label: this.translateService.instant('search.searchHistoryTab'), routerLink: 'search-history'}
    ];

    this.selectedItem = this.components[0];
  }

  showToast(): void {
    this.messageService.showSuccessMessageLocalized('general.savedSuccessfully');
  }
}
