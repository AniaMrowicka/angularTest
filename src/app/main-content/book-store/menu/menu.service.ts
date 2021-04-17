import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {Menu} from '../../../common/model/Menu';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private addPosition$ = new Subject<Menu>();
  private removePosition$ = new Subject<Menu>();
  constructor(private httpClient: HttpClient) {
  }
  public getMenu(): Observable<Menu[]>{
    return this.httpClient.get<Menu[]>('/api/getMenuList');
  }
  addPositionToList(position: Menu): void{
    this.addPosition$.next(position);
  }
  getPosition(): Observable<Menu>{
   return this.addPosition$.asObservable();
  }
  removePositionFromListAndEnableButton(position: Menu): void {
    this.removePosition$.next(position);
  }
  enableButton(): Observable<Menu>{
    return this.removePosition$.asObservable();
  }
}
