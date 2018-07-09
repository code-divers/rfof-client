import { Injectable } from '@angular/core';
import { Observable, of, from } from 'rxjs';
import { filter, toArray } from 'rxjs/operators';
import { Cage, CageGroup, CageModule, PowerSupply, TrapReciver, EventLogItem } from './cage';

//Mock data
import { CAGE, CAGE_GROUPS, CAGE_MODULES, CAGE_EVENTS, CAGE_POWERSUPPLY, CAGE_TRAPRECIVERS } from './mock'; 

@Injectable({
  providedIn: 'root'
})
export class MIBService {

  constructor() {
  }

  getCageInfo(OID: string): Observable<Cage> {
  	return of(CAGE);
  }

  getCageGroups(OID: string): Observable<CageGroup[]> {
    return of(CAGE_GROUPS);
  }

  getCageModules(OID: string): Observable<CageModule[]> {
    return of(CAGE_MODULES);
  }

  getCageGroupModule(group: CageGroup): Observable<CageModule[]> {
    return from(CAGE_MODULES).pipe(
      filter(module => module.group.name == group.name)).pipe(toArray());
  }

  getCageEventLog(OID: string): Observable<EventLogItem[]> {
    return of(CAGE_EVENTS);
  }

  getCagePowerSupply(OID: string): Observable<PowerSupply[]>{
    return of(CAGE_POWERSUPPLY);
  }

  getCageTrapReciver(OID: string): Observable<TrapReciver[]>{
    return of(CAGE_TRAPRECIVERS);
  }
}
