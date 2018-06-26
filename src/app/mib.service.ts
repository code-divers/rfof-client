import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Cage, CageGroup } from './cage';

//Mock data
import { CAGE_GROUPS, CAGE_MODULES } from './mock'; 

@Injectable({
  providedIn: 'root'
})
export class MIBService {

  constructor() {
  }

  getCageInfo(OID): Observable<Cage> {
  	var cage: Cage = {
  		OID: OID,
  		description: 'A virtual cage',
      serial: '01-02-03-04',
      version: '1.1a',
      versionDate: '20180101',
      psCount: 1,
      slotsCount: 3
  	}
  	return of(cage);
  }

  getCageGroups(OID): Observable<CageGroup[]> {
    return of(CAGE_GROUPS);
  }

  getCageGroupModule(group: CageGroup) {
    return of(CAGE_MODULES).pipe(
      filter((module, idx)=>{ return module[idx].group.name == group.name }))
  }
}
