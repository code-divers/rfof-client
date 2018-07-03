import {
	Component, 
	OnInit, 
	Input } from '@angular/core';
import { Cage, CageModule } from '../cage';
import { MIBService } from '../mib.service';

@Component({
  selector: 'rfof-cage-visual',
  templateUrl: './cage-visual.component.html',
  styleUrls: ['./cage-visual.component.scss']
})
export class CageVisualComponent implements OnInit {
	
	@Input() OID: string;
	modules: CageModule[];
	slots: Slot[] = [{num: 0},{num: 1},{num: 2},{num: 3},{num: 4},{num: 5},{num: 6},{num: 7}];
	constructor(private mibService: MIBService) { }

	ngOnInit() {
		this.mibService.getCageModules(this.OID)
			.subscribe((modules)=>{
				this.modules = modules;
				for(var module of modules){
					var slot = this.slots.find(slot=>{
						return slot.num == module.slot;
					});
					slot.module = module;
				}
			});
	}
}

class Slot {
	num: number;
	module?: CageModule;
}

