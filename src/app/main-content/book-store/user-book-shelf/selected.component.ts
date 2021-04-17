import {Component, OnDestroy, OnInit} from '@angular/core';
import {MenuService} from '../menu/menu.service';
import {Menu} from '../../../common/model/Menu';
import {filter, findIndex, takeUntil, tap} from 'rxjs/operators';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-selected',
  templateUrl: './selected.component.html',
  styleUrls: ['./selected.component.css']
})
export class SelectedComponent implements OnInit , OnDestroy {
  private stop$ = new Subject();
  positionToAddOrRemove: Menu;
  selectedMenu: Menu[];

  constructor(private menuService: MenuService) {
  }

  ngOnInit(): void {
    this.selectedMenu = [];
    this.checkSelectedPosition();
  }

  private checkSelectedPosition(): void {
    this.menuService.getPosition()
      .pipe(
        takeUntil(this.stop$),
        filter(position => !!position),
        tap(position => {
          this.addToList(position);
        }
    )
      )
      .subscribe();
  }
  ngOnDestroy(): void {
    this.stop$.next();
    this.stop$.complete();
  }

 addToList(position: Menu): void {
  if (position.selected){
    this.selectedMenu.push(position);
  }
  }

  removeRow(position: Menu): void {
    const idx = this.selectedMenu?.findIndex(menu => menu.name === position.name);
    this.selectedMenu.splice(idx, 1);
    this.menuService.removePositionFromListAndEnableButton(position);
  }
}
