import {
	Component, 
	OnInit, 
	Input } from '@angular/core';
import { Cage, CageModule } from 'rfof-common';
import { MIBService } from '../mib.service';
import { ModuleManagerService, SelectedModule } from '../module-manager.service';

@Component({
  selector: 'rfof-cage-visual',
  templateUrl: './cage-visual.component.html',
  styleUrls: ['./cage-visual.component.scss']
})
export class CageVisualComponent implements OnInit {
	@Input() modules: CageModule[];
	@Input() cage: Cage;
	cageVisual: string;
	selectedModules: SelectedModule[] = [];
	slots = [1,2,3,4,5,6,7,8];
	constructor(private mibService: MIBService, private moduleManagerService: ModuleManagerService) { 
		
	}

	ngOnInit() {
		let cageImage = `cage_${this.interpretCageVisual()}.png`
		this.cageVisual = `/assets/cage/${cageImage}`;

		this.moduleManagerService.moduleSelected$.subscribe(selected=>{
			this.selectedModules = selected;
		});
	}

	getSlotModule(slot){
		return this.modules.find(module=>{
			return module.slot == slot-1;
		})
	}

	isSelected(slot){
		for(let item of this.selectedModules){
			if(item.module.slot == slot-1){
				return true;
			}
		}
		return false;
	}

	interpretCageVisual() {
		let regEx = /^(.{4})(\d).+$/
		let result = this.cage.description.match(regEx);
		if(result){
			return result[2];
		}else{
			return 1;
		}
	}
}

class Slot {
	num: number;
	module?: CageModule;
}

