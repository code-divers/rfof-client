import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs';
import { CageModule } from './cage';

@Injectable({
  providedIn: 'root'
})
export class ModuleManagerService {
	private selectedModules: CageModule[] = [];
	private modulesSelectedSource = new Subject<CageModule[]>();

	moduleSelected$ = this.modulesSelectedSource.asObservable();

	selectModule(module: CageModule){
		this.selectedModules.push(module);
		this.modulesSelectedSource.next(this.selectedModules);
	}

	deselectModule(module :CageModule){
		var idx = this.selectedModules.indexOf(module);
		if(idx > -1){
			this.selectedModules.splice(idx,1);
		}
		this.modulesSelectedSource.next(this.selectedModules);
	}


  	constructor() { }
}
