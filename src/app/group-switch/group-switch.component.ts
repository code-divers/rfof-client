import { Component, OnInit, Input } from '@angular/core';
import { CageGroup, GroupRedundency } from 'rfof-common';

@Component({
  selector: 'rfof-group-switch',
  templateUrl: './group-switch.component.html',
  styleUrls: ['./group-switch.component.scss']
})
export class GroupSwitchComponent implements OnInit {
	@Input() group: CageGroup;
	selectedValue: string;
	
	constructor() { }

	ngOnInit() {
		this.selectedValue = this.toRedundancyName(this.group.redundencySwitch);
	}

	toRedundancyName(value){
		return GroupRedundency[value];
	}

	displayOption(value){
		var redundancySwitch = this.group.redundencySwitch;
		if(redundancySwitch == GroupRedundency.none){
			if(value=='none'){
				return true;
			}
		}
		if(redundancySwitch == GroupRedundency.auto){
			if(value=='auto' || value=='manualprimary' || value=='manualbackup'){
				return true;
			}
			return false;
		}
		if(redundancySwitch == GroupRedundency.manualprimary || redundancySwitch == GroupRedundency.manualbackup ){
			if(value=='manualprimary' || value=='manualbackup'){
				return true;
			}
			return false;
		}
	}
}
