import { Component, OnInit, Input } from '@angular/core';
import { CageModule, ModuleStatus } from 'rfof-common';

@Component({
  selector: 'rfof-module-led',
  templateUrl: './module-led.component.html',
  styleUrls: ['./module-led.component.scss']
})
export class ModuleLedComponent implements OnInit {
	@Input() module: CageModule;
	@Input() wide: boolean = false;
	constructor() { }

	ngOnInit() {
	}

	toModuleStatusName(value){
		return ModuleStatus[value];
	}

}
