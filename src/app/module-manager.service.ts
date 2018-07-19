import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs';
import { CageModule } from './cage';

@Injectable({
  providedIn: 'root'
})
export class ModuleManagerService {
	private selectedModules: SelectedModule[] = [];
	private modulesSelectedSource = new Subject<SelectedModule[]>();

	moduleSelected$ = this.modulesSelectedSource.asObservable();

	selectModule(option: SelectedModule){
		var idx = this.selectedModules.findIndex((selected)=>{
			return selected.module.name == option.module.name;
		});
		if(idx == -1){
			this.selectedModules.push(option);
			this.modulesSelectedSource.next(this.selectedModules);
		}
	}

	deselectModule(option: SelectedModule){
		var idx = this.selectedModules.findIndex((selected)=>{
			return selected.module.name == option.module.name;
		});
		if(idx > -1){
			this.selectedModules.splice(idx,1);
		}
		this.modulesSelectedSource.next(this.selectedModules);
	}


  	constructor() { }
}

export interface SelectedModule{
	module: CageModule;
	isOpen: boolean;
}
