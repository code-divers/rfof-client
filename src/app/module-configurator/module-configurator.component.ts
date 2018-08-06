import { Component, OnInit, InjectionToken } from '@angular/core';
import { CageModule } from '../cage';
import { ModuleManagerService } from '../module-manager.service';

export const MODULE_DATA = new InjectionToken<CageModule>('MODULE_DATA');
export const MODULE_MANAGER_SERVICE = new InjectionToken<ModuleManagerService>('MODULE_MANAGER_SERVICE');

@Component({
  selector: 'rfof-module-configurator',
  templateUrl: './module-configurator.component.html',
  styleUrls: ['./module-configurator.component.scss']
})
export class ModuleConfiguratorComponent implements OnInit {
	
	
	constructor() { }

	ngOnInit() {
	}

}
