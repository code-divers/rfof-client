import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs';
import { CageModule } from './cage';

@Injectable({
  providedIn: 'root'
})
export class ModuleManagerService {
	private modulesSelectedSource = new Subject<CageModule>();
	private modulesDeselectedSource = new Subject<CageModule>();

	moduleSelected$ = this.modulesSelectedSource.asObservable();
	moduleDeselected$ = this.modulesDeselectedSource.asObservable();

	selectModule(module: CageModule){
		this.modulesSelectedSource.next(module);
	}

	deselectModule(module :CageModule){
		this.modulesDeselectedSource.next(module);
	}


  	constructor() { }
}
