import { Component, OnInit, Input } from '@angular/core';
import { CageGroup, GroupRedundency } from '../cage';

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
}
