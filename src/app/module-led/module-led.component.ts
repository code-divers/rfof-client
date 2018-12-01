import { Component, OnInit, Input } from '@angular/core';
import { CageModule, ModuleStatus, ModuleStatusLED } from 'rfof-common';
import { MIBService } from '../mib.service';

@Component({
  selector: 'rfof-module-led',
  templateUrl: './module-led.component.html',
  styleUrls: ['./module-led.component.scss']
})
export class ModuleLedComponent implements OnInit {
	@Input() module: CageModule;
	@Input() wide: boolean = false;
	constructor(private mibService: MIBService) { }

	ngOnInit() {
		
	}

	toModuleStatusClass(){
		return {
			'wide': this.wide,
			'led-off': this.module.statusLED == ModuleStatusLED.off,
			'led-fault': this.module.statusLED == ModuleStatusLED.fault,
			'led-green': this.module.statusLED == ModuleStatusLED.green,
			'led-red': this.module.statusLED == ModuleStatusLED.red,
			'led-cyan': this.module.statusLED == ModuleStatusLED.cyan,
			'led-blue': this.module.statusLED == ModuleStatusLED.blue,
			'led-redblink': this.module.statusLED == ModuleStatusLED.redblink,
			'led-blueblink': this.module.statusLED == ModuleStatusLED.blueblink
		}
	}

	toModuleStatusName(){
		return ModuleStatus[this.module.status];
	}

}
