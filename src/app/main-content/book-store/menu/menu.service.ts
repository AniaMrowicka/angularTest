import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {Menu} from '../../../common/model/Menu';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private addPosition$ = new BehaviorSubject(undefined);
  private removePosition$ = new BehaviorSubject(undefined);
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
