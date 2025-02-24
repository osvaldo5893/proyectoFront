import { Component, OnDestroy, Renderer2, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { MenuService, LayoutService } from '../../../_services';
import { filter, Subscription } from 'rxjs';

import { SidebarComponent } from '../sidebar/sidebar.component';


@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
})
export class LayoutComponent implements OnDestroy {
  overlayMenuOpenSubscription: Subscription;

  menuOutsideClickListener: any;

  @ViewChild(SidebarComponent) appSidebar!: SidebarComponent;

  constructor(
    private menuService: MenuService,
    public layoutService: LayoutService,
    public renderer: Renderer2,
    public router: Router
  ) {
    this.overlayMenuOpenSubscription =
      this.layoutService.overlayOpen$.subscribe(() => {
        if (!this.menuOutsideClickListener) {
          this.menuOutsideClickListener = this.renderer.listen(
            'document',
            'click',
            (event) => {
              const isOutsideClicked = !(
                this.appSidebar.el.nativeElement.isSameNode(event.target) ||
                this.appSidebar.el.nativeElement.contains(event.target) ||
                event.target.classList.contains('p-trigger') ||
                event.target.parentNode.classList.contains('p-trigger')
              );
              if (isOutsideClicked) {
                this.layoutService.state.overlayMenuActive = false;
                this.layoutService.state.staticMenuMobileActive = false;
                this.layoutService.state.menuHoverActive = false;
                this.menuService.reset();
                this.menuOutsideClickListener();
                this.menuOutsideClickListener = null;
                this.unblockBodyScroll();
              } else {
                if (this.layoutService.state.staticMenuMobileActive) {
                  this.blockBodyScroll();
                }
              }
            }
          );
        }
      });

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.unblockBodyScroll();
      });
  }

  blockBodyScroll(): void {
    if (document.body.classList) {
      document.body.classList.add('blocked-scroll');
    } else {
      document.body.className += ' blocked-scroll';
    }
  }

  unblockBodyScroll(): void {
    if (document.body.classList) {
      document.body.classList.remove('blocked-scroll');
    } else {
      document.body.className = document.body.className.replace(
        new RegExp(
          '(^|\\b)' + 'blocked-scroll'.split(' ').join('|') + '(\\b|$)',
          'gi'
        ),
        ' '
      );
    }
  }

  get containerClass() {
    return {
      'layout-light': this.layoutService.config.colorScheme === 'light',
      'layout-dim': this.layoutService.config.colorScheme === 'dim',
      'layout-dark': this.layoutService.config.colorScheme === 'dark',
      'layout-colorscheme-menu':
        this.layoutService.config.menuTheme === 'colorScheme',
      'layout-primarycolor-menu':
        this.layoutService.config.menuTheme === 'primaryColor',
      'layout-transparent-menu':
        this.layoutService.config.menuTheme === 'transparent',
      'layout-overlay': this.layoutService.config.menuMode === 'overlay',
      'layout-static': this.layoutService.config.menuMode === 'static',
      'layout-slim': this.layoutService.config.menuMode === 'slim',
      'layout-horizontal': this.layoutService.config.menuMode === 'horizontal',
      'layout-static-inactive':
        this.layoutService.state.staticMenuDesktopInactive &&
        this.layoutService.config.menuMode === 'static',
      'layout-overlay-active': this.layoutService.state.overlayMenuActive,
      'layout-mobile-active': this.layoutService.state.staticMenuMobileActive,
      'p-input-filled': this.layoutService.config.inputStyle === 'filled',
      'p-ripple-disabled': !this.layoutService.config.ripple,
    };
  }

  ngOnDestroy() {
    if (this.overlayMenuOpenSubscription) {
      this.overlayMenuOpenSubscription.unsubscribe();
    }

    if (this.menuOutsideClickListener) {
      this.menuOutsideClickListener();
    }
  }
}
