import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { filter } from "rxjs/operators";
@Component({
  selector: "app-pages-layout",
  templateUrl: "./pages-layout.component.html",
  styleUrls: ["./pages-layout.component.scss"],
})
export class PagesLayoutComponent implements OnInit, OnDestroy {
  routeEventSubs: Subscription;
  pageTitle: string;
  constructor(private _router: Router, private _activeRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.setPageTitle();
    /**
     * handle on navigate
     */
    this.routeEventSubs = this._router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((_: NavigationEnd) => {
        this.setPageTitle();
      });
  }

  setPageTitle() {
    const node = this._activeRoute.snapshot.firstChild.firstChild;
    if (!node) return;
    document.title = node.data.title;
    this.pageTitle = node.data.title;
  }

  ngOnDestroy(): void {
    if (this.routeEventSubs) this.routeEventSubs.unsubscribe();
  }
}
