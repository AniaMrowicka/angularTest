import {Component, OnDestroy, OnInit} from '@angular/core';
import {MenuService} from './menu.service';
import {of, Subject} from 'rxjs';
import {catchError, filter,  takeUntil, tap} from 'rxjs/operators';
import {Menu} from '../../../common/model/Menu';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit, OnDestroy {
  private stop$ = new Subject();
  menu: Menu[];

  constructor(private menuService: MenuService) {
  }

  ngOnInit(): void {
    this.getAvailableMenu();
    this.enableButton()
  }

  private getAvailableMenu(): void {
    this.menuService.getMenu().pipe(takeUntil(this.stop$),
      filter(menu => !!menu),
      tap(menu => {
        this.menu = menu;
        this.menu.map(pos => pos.selected = false);
      }),
      catchError(err => {
        console.log('error during data download');
        return of({});
      })).subscribe();
  }

  ngOnDestroy(): void {
    this.stop$.next();
    this.stop$.complete();
  }

  addPosition(position: Menu): void {
    position.selected = !position.selected;
    this.menuService.addPositionToList(position);
  }


  private enableButton(): void {
    this.menuService.enableButton().pipe(takeUntil(this.stop$),
      filter(positionToEnableButton => !!positionToEnableButton),
      tap(positionToEnableButton => {
      const idx = this.menu.findIndex(position => position.name === positionToEnableButton.name);
      this.menu[idx].selected = false;
      })).subscribe();
  }
}
