import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Cage, CageGroup, CageModule, EventLogItem } from './cage';

//Mock data
import { CAGE, CAGE_GROUPS, CAGE_MODULES, CAGE_EVENTS } from './mock'; 

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
    return of(CAGE_MODULES).pipe(
      filter((module, idx)=>{ return module[idx].group.name == group.name }))
  }

  getCageEventLog(OID: string): Observable<EventLogItem[]> {
    return of(CAGE_EVENTS);
  }
}
