import { Injectable } from '@angular/core';
import { Observable, of, from, forkJoin, Subject } from 'rxjs';
import { filter, toArray, catchError, map, tap, first} from 'rxjs/operators';
import { Cage, CageState, CageGroup, CageModule, CageSlot, PowerSupply, TrapReciver, EventLogItem } from 'rfof-common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MessageService } from './message.service';
import { environment } from '../environments/environment';
import * as io from 'socket.io-client';


@Injectable({
  providedIn: 'root'
})
export class MIBService {
  restTimer;
  restApi;
  socketApi;
  private socket;
  cage: Cage;
  cageState: CageState;
  power: PowerSupply[];
  network: TrapReciver[];
  groups: CageGroup[];
  modules: CageModule[];
  events: EventLogItem[];
  private isUpdating = false;

  private dataChangedSource = new Subject<MIBService>();
  private dataLoadingSource = new Subject<boolean>();
  private sensorsLoadedSource = new Subject<any>();
  private eventLoadedSource = new Subject<any>();
  private cageStateChangedSource = new Subject<CageState>();
  private slotStateChangedSource = new Subject<CageSlot>();

  dataChanged$ = this.dataChangedSource.asObservable();
  dataLoading$ = this.dataLoadingSource.asObservable();
  sensorsLoaded$ = this.sensorsLoadedSource.asObservable();
  eventLoaded$ = this.eventLoadedSource.asObservable();
  cageStateChanged$ = this.cageStateChangedSource.asObservable();
  slotStateChanged$ = this.slotStateChangedSource.asObservable();

  constructor(private http: HttpClient, private messageService: MessageService) {
    this.restApi = environment.production ? `http://${window.location.host}/api` : environment.restApi; 
    this.socket = io(environment.production ? window.location.host : environment.socketApi);
    this.socket.on('sensors', (sensors) => {
      this.sensorsLoadedSource.next(sensors);
    });
    this.socket.on('moduleupdate', (module) => {
      let idx = this.modules.findIndex((item)=>{
        return item.slot == module.slot;
      })
      this.modules[idx] = module;
      this.dataChangedSource.next(this);
    });
    this.socket.on('eventlogline', (logline) => {
      this.events.unshift(logline);
      this.eventLoadedSource.next(this.events);
    });
    this.socket.on('cageStateChanged', (state: CageState) => {
      if(state == CageState.on){
        this.collectData();
      }else{
        this.cageState = state;
        this.cageStateChangedSource.next(state);
      }
    });
    this.socket.on('slotStatusChanged', (slot) => {
      this.slotStateChangedSource.next(slot);
    });
  }

  initiateTimer() {
      if (this.restTimer) {
          clearTimeout(this.restTimer);
      }

      this.restTimer = setTimeout(this.collectData.bind(this), environment.pollingTimeout);
  }

  collectData(){
    if(!this.isUpdating){
      let source = forkJoin(
        this.requestCageInfo(), 
        this.requestCageGroups(), 
        this.requestCageModules(),
        this.requestCageEventLog(),
        this.requestCagePowerSupply(),
        this.requestCageTrapReciver(),
        this.requestCageState()).subscribe((results)=>{
        this.cage = results[0];
        this.groups = results[1];
        this.modules = results[2];
        this.events = results[3];
        this.power = results[4];
        this.network = results[5];
        if(this.cageState != results[6]){
          this.cageState = results[6];
          this.cageStateChangedSource.next(this.cageState);
        }
        
        this.dataChangedSource.next(this);
        this.dataLoadingSource.next(false);
        this.initiateTimer();
      });
    }else{
      this.dataLoadingSource.next(false);
      this.initiateTimer();
    }
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      this.messageService.add(`${operation} failed: ${error.message}`);
      console.error(`${operation} failed: ${error.message}`);
      this.isUpdating = false;
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
      return this.modules.filter((module)=>{return module.group.index == group.index});
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

  requestCageState(): Observable<TrapReciver[]> {
    return this.http.get<CageState>(this.restApi + '/cage/state')
      .pipe(map((response:any)=>{
        return response.data
      }))
      .pipe(catchError(this.handleError('getCageState', [])))
  }

  updateCageModule(module){
    return this.http.post(this.restApi + '/cage/module', {
      module: module
    })
    .pipe(map((response:any)=>{
      let index = this.modules.findIndex(item=>{
        return item.slot == module.slot
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

  updateCageSettings(settings){
    this.isUpdating = true;
    return this.http.post(this.restApi + '/cage/settings', {
      settings: settings
    })
    .pipe(map((response:any)=>{
      this.isUpdating = false;
      return response.data
    }))
    .pipe(catchError(this.handleError('updateCageSettings', [])));
  }
}
