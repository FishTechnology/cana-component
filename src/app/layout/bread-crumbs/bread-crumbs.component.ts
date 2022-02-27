import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { MenuItem } from './models/menuitem';
import { isNotNullOrUndefined } from 'codelyzer/util/isNotNullOrUndefined';

@Component({
  selector: 'app-bread-crumbs',
  templateUrl: './bread-crumbs.component.html',
  styleUrls: ['./bread-crumbs.component.scss']
})
export class BreadCrumbsComponent implements OnInit {
  static readonly ROUTE_DATA_BREADCRUMB = 'breadcrumb';
  menuItems: MenuItem[] | undefined;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe({
        next: (res) => {
          this.menuItems = this.createBreadCrumbs(this.activatedRoute.root);
        },
        error: (err) => {
        }
      });
  }

  // @ts-ignore
  createBreadCrumbs(route: ActivatedRoute, url: string = '#', breadcrumbs: MenuItem[] = []): MenuItem[] {
    const children: ActivatedRoute[] = route.children;
    if (children.length === 0) {
      return breadcrumbs;
    }

    for (const child of children) {
      const routeUrl = child.snapshot.url.map(segment => segment.path).join('/');
      if (routeUrl !== '') {
        url += `/${routeUrl}`;
      }

      const label = child.snapshot.data[BreadCrumbsComponent.ROUTE_DATA_BREADCRUMB];
      if (isNotNullOrUndefined(label)) {
        breadcrumbs.push({ label, url });
      }

      return this.createBreadCrumbs(child, url, breadcrumbs);
    }
  }
}
