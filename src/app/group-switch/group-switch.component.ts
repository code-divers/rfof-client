import { Component, OnInit, Input } from '@angular/core';
import { CageGroup, GroupRedundancy } from 'rfof-common';
import { MIBService } from '../mib.service';

@Component({
  selector: 'rfof-group-switch',
  templateUrl: './group-switch.component.html',
  styleUrls: ['./group-switch.component.scss']
})
export class GroupSwitchComponent implements OnInit {
	@Input() group: CageGroup;
	selectedValue: string;
	
	constructor(private mib: MIBService) { }

	ngOnInit() {
		this.selectedValue = this.group.redundancySwitch.toString();
	}

	toRedundancyName(value){
		return GroupRedundancy[value];
	}

	displayOptionDisabled(value){
		var redundancySwitch = GroupRedundancy[this.group.redundancySwitch];
		if(redundancySwitch == 'none'){
			if(value=='none'){
				return false;
			}
		}
		if(redundancySwitch == 'auto'){
			if(value=='auto' || value=='manualprimary' || value=='manualbackup'){
				return false;
			}
			return true;
		}
		if(redundancySwitch == 'manualprimary' || redundancySwitch == 'manualbackup' ){
			if(value=='manualprimary' || value=='manualbackup'){
				return false;
			}
			return true;
		}
		return true;
	}

	switchRedundency(){
		this.group.redundancySwitch = this.selectedValue;
		this.mib.updateCageGroup(this.group).subscribe((result)=>{
			console.log(result);
		});
	}
}
