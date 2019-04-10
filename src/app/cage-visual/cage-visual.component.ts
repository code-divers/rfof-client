import {
	Component, 
	OnInit, 
	Input } from '@angular/core';
import { Cage, CageModule, CageSlot, SlotStatus } from 'rfof-common';
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
	@Input() slotCount: number = 16;
	cageVisual: string;
	selectedModules: SelectedModule[] = [];
	slots: CageSlot[] = [];
	constructor(private mibService: MIBService, private moduleManagerService: ModuleManagerService) { 
		
	}

	ngOnInit() {
		let cageImage = `${this.interpretCageVisual()}.png`
		this.cageVisual = `/assets/cage/${cageImage}`;

		for(var slotNumber=0; slotNumber < this.slotCount; slotNumber++){
			let slot = new CageSlot();
			slot.num = slotNumber;
			slot.status = SlotStatus.out;
			this.slots.push(slot);
		}

		this.modules.map((module)=>{
			let slot = this.slots.find((slot)=>{
				return slot.num == module.slot;
			});
			slot.module = module;
			slot.label = module.slotLabel;
			slot.status = module.slotStatus;
		})

		this.mibService.slotStateChanged$.subscribe(module=>{
			let slot = this.slots.find((slot)=>{
				return slot.num == module.slot;
			});
			slot.status = module.slotStatus;
		})

		this.moduleManagerService.moduleSelected$.subscribe(selected=>{
			this.selectedModules = selected;
		});
		this.selectedModules = this.modules.map((module)=>{
			return {
				module: module,
				isOpen: false
			};
		})
	}

	getVisualClass() {
		return `visual_${this.interpretCageVisual()}`;
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
		let result = 'R1';
		if(this.cage.partNumber.length > 8){
			result = this.cage.partNumber.slice(6, 8);
		}
		return result;
	}
}

