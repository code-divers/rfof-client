import { Injectable } from '@angular/core';
import { Observable, of, from, forkJoin, Subject } from 'rxjs';
import { filter, toArray, catchError, map, tap} from 'rxjs/operators';
import { Cage, CageGroup, CageModule, PowerSupply, TrapReciver, EventLogItem } from 'rfof-common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MessageService } from './message.service';
import { environment } from '../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class MIBService {
  timer;
  apiUrl = environment.apiUrl;
  cage: Cage;
  power: PowerSupply[];
  network: TrapReciver[];
  groups: CageGroup[];
  modules: CageModule[];
  events: EventLogItem[];

  private dataChangedSource = new Subject<MIBService>();
  private dataLoadingSource = new Subject<boolean>();

  dataChanged$ = this.dataChangedSource.asObservable();
  dataLoading$ = this.dataLoadingSource.asObservable();

  constructor(private http: HttpClient, private messageService: MessageService) {
    
  }

  initiateTimer() {
      if (this.timer) {
          clearTimeout(this.timer);
      }

      this.timer = setTimeout(this.collectData.bind(this), 30000);
  }

  collectData(){
    this.dataLoadingSource.next(true);
    let source = forkJoin(
      this.requestCageInfo(), 
      this.requestCageGroups(), 
      this.requestCageModules(),
      this.requestCageEventLog(),
      this.requestCagePowerSupply(),
      this.requestCageTrapReciver()).subscribe((results)=>{
      this.cage = results[0];
      this.groups = results[1];
      this.modules = results[2];
      this.events = results[3];
      this.power = results[4];
      this.network = results[5];
      this.dataChangedSource.next(this);
      this.dataLoadingSource.next(false);
      this.initiateTimer();
    });

  /*var subscription = source.subscribe(
    x => console.log(`onNext: ${x}`),
    e => console.log(`onError: ${e}`),
    () => console.log('onCompleted'));
    }*/
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      this.messageService.add(`${operation} failed: ${error.message}`);
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  getCageInfo(): Observable<Cage> {
    return of(this.cage);
  }

  requestCageInfo(): Observable<Cage> {
  	return this.http.get<Cage>(this.apiUrl + '/cage')
    .pipe(map((response:any)=>{
      return response.data;
    }))
    .pipe(catchError(this.handleError('getCageInfo', null)))
  }

  getCageGroups(): Observable<CageGroup[]> {
     return of(this.groups);
  }

  requestCageGroups(): Observable<CageGroup[]> {
    return this.http.get<CageGroup[]>(this.apiUrl + '/cage/groups')
      .pipe(map((response:any)=>{
        return response.data;
      }))
      .pipe(catchError(this.handleError('getCageGroups', [])))
  }

  getCageModules(): Observable<CageModule[]> {
    return of(this.modules);
  }

  requestCageModules(): Observable<CageModule[]> {
    return this.http.get<CageModule[]>(this.apiUrl + '/cage/modules')
      .pipe(map((response:any)=>{
        return response.data
      }))
      .pipe(catchError(this.handleError('getCageGroups', [])))
  }

  getCageGroupModules(group: CageGroup): CageModule[] {
      return this.modules.filter((module)=>{return module.group.name == group.name});
  }

  getCageEventLog(): Observable<EventLogItem[]> {
    return of(this.events);
  }

  requestCageEventLog(): Observable<EventLogItem[]> {
    return this.http.get<EventLogItem[]>(this.apiUrl + '/cage/events')
      .pipe(map((response:any)=>{
        return response.data
      }))
      .pipe(catchError(this.handleError('getEvents', [])))
  }

  getCagePowerSupply(): Observable<PowerSupply[]>{
    return of(this.power);
  }

  requestCagePowerSupply(): Observable<PowerSupply[]> {
    return this.http.get<PowerSupply[]>(this.apiUrl + '/cage/power')
      .pipe(map((response:any)=>{
        return response.data
      }))
      .pipe(catchError(this.handleError('getCagePowerSupply', [])))
  }

  getCageTrapReciver(): Observable<TrapReciver[]>{
    return of(this.network);
  }

  requestCageTrapReciver(): Observable<TrapReciver[]> {
    return this.http.get<TrapReciver[]>(this.apiUrl + '/cage/network')
      .pipe(map((response:any)=>{
        return response.data
      }))
      .pipe(catchError(this.handleError('getCageTrapReciver', [])))
  }

  updateCageModule(module){
    return this.http.post(this.apiUrl + '/cage/module', {
      module: module
    })
    .pipe(map((response:any)=>{  
      return response.data
    }))
    .pipe(catchError(this.handleError('updateCageModule', [])));
  }
}
