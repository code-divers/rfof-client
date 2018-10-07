import {
	Component, 
	OnInit, 
	Input } from '@angular/core';
import { Cage, CageModule } from 'rfof-common';
import { MIBService } from '../mib.service';

@Component({
  selector: 'rfof-cage-visual',
  templateUrl: './cage-visual.component.html',
  styleUrls: ['./cage-visual.component.scss']
})
export class CageVisualComponent implements OnInit {
	@Input() modules: CageModule[];
	slots: Slot[] = [{num: 0},{num: 1},{num: 2},{num: 3},{num: 4},{num: 5},{num: 6},{num: 7}];
	constructor(private mibService: MIBService) { }

	ngOnInit() {
		for(var module of this.modules){
			var slot = this.slots.find(slot=>{
				return slot.num == Number(module.slot);
			});
			if(slot){
				slot.module = module;
			}
		}
	}
}

class Slot {
	num: number;
	module?: CageModule;
}

