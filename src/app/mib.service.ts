import { Injectable } from '@angular/core';
import { Observable, of, from, forkJoin, Subject } from 'rxjs';
import { filter, toArray, catchError, map, tap} from 'rxjs/operators';
import { Cage, CageGroup, CageModule, PowerSupply, TrapReciver, EventLogItem } from 'rfof-common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MessageService } from './message.service';
import { environment } from '../environments/environment';
import * as io from 'socket.io-client';


@Injectable({
  providedIn: 'root'
})
export class MIBService {
  restTimer;
  restApi = environment.restApi;
  socketApi = environment.socketApi;
  private socket;
  cage: Cage;
  power: PowerSupply[];
  network: TrapReciver[];
  groups: CageGroup[];
  modules: CageModule[];
  events: EventLogItem[];

  private dataChangedSource = new Subject<MIBService>();
  private dataLoadingSource = new Subject<boolean>();
  private sensorsLoadedSource = new Subject<any>()

  dataChanged$ = this.dataChangedSource.asObservable();
  dataLoading$ = this.dataLoadingSource.asObservable();
  sensorsLoaded$ = this.sensorsLoadedSource.asObservable();

  constructor(private http: HttpClient, private messageService: MessageService) {
    this.socket = io(this.socketApi);
    this.socket.on('sensors', (sensors) => {
      console.log(sensors);
      this.sensorsLoadedSource.next(sensors);
    });
  }

  initiateTimer() {
      if (this.restTimer) {
          clearTimeout(this.restTimer);
      }

      this.restTimer = setTimeout(this.collectData.bind(this), 30000);
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
  	return this.http.get<Cage>(this.restApi + '/cage')
    .pipe(map((response:any)=>{
      return response.data;
    }))
    .pipe(catchError(this.handleError('getCageInfo', null)))
  }

  getCageGroups(): Observable<CageGroup[]> {
     return of(this.groups);
  }

  requestCageGroups(): Observable<CageGroup[]> {
    return this.http.get<CageGroup[]>(this.restApi + '/cage/groups')
      .pipe(map((response:any)=>{
        return response.data;
      }))
      .pipe(catchError(this.handleError('getCageGroups', [])))
  }

  getCageModules(): Observable<CageModule[]> {
    return of(this.modules);
  }

  requestCageModules(): Observable<CageModule[]> {
    return this.http.get<CageModule[]>(this.restApi + '/cage/modules')
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
    return this.http.get<EventLogItem[]>(this.restApi + '/cage/events')
      .pipe(map((response:any)=>{
        return response.data
      }))
      .pipe(catchError(this.handleError('getEvents', [])))
  }

  getCagePowerSupply(): Observable<PowerSupply[]>{
    return of(this.power);
  }

  requestCagePowerSupply(): Observable<PowerSupply[]> {
    return this.http.get<PowerSupply[]>(this.restApi + '/cage/power')
      .pipe(map((response:any)=>{
        return response.data
      }))
      .pipe(catchError(this.handleError('getCagePowerSupply', [])))
  }

  getCageTrapReciver(): Observable<TrapReciver[]>{
    return of(this.network);
  }

  requestCageTrapReciver(): Observable<TrapReciver[]> {
    return this.http.get<TrapReciver[]>(this.restApi + '/cage/network')
      .pipe(map((response:any)=>{
        return response.data
      }))
      .pipe(catchError(this.handleError('getCageTrapReciver', [])))
  }

  updateCageModule(module){
    return this.http.post(this.restApi + '/cage/module', {
      module: module
    })
    .pipe(map((response:any)=>{
      let index = this.modules.findIndex(item=>{
        return item.name == module.name && item.slot == module.slot
      });
      this.modules[index] = module;
      this.dataChangedSource.next(this);
      return response.data
    }))
    .pipe(catchError(this.handleError('updateCageModule', [])));
  }

  updateCageGroup(group){
    return this.http.post(this.restApi + '/cage/group', {
      group: group
    })
    .pipe(map((response:any)=>{  
      return response.data
    }))
    .pipe(catchError(this.handleError('updateCageGroup', [])));
  }
}
