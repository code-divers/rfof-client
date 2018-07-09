import { Component, OnInit, Input,Output, Inject, InjectionToken, EventEmitter} from '@angular/core';
import { CageModule, ModuleType, BiasTState } from '../cage';
import { ModuleManagerService } from '../module-manager.service'

export const POPUP_DATA = new InjectionToken<CageModule>('POPUP_DATA');
export const MODULE_MANAGER_SERVICE = new InjectionToken<ModuleManagerService>('MODULE_MANAGER_SERVICE');

@Component({
  selector: 'rfof-module-popup',
  templateUrl: './module-popup.component.html',
  styleUrls: ['./module-popup.component.scss']
})
export class ModulePopupComponent implements OnInit {
	
	constructor(@Inject(POPUP_DATA) public module: CageModule, @Inject(MODULE_MANAGER_SERVICE) public moduleManagerService: ModuleManagerService) { 

	}

	ngOnInit() {
	}

	toTypeName(type){
		return ModuleType[type];
	}

	toBiasTName(state){
		return BiasTState[state];
	}

	onClose(){
		console.log('outside');
		this.moduleManagerService.deselectModule(this.module);
	}

}





