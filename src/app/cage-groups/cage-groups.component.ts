import { Component, OnInit, Input } from '@angular/core';
import { MIBService } from '../mib.service';
import { CageGroup, GroupType } from '../cage';
 
@Component({
  selector: 'rfof-cage-groups',
  templateUrl: './cage-groups.component.html',
  styleUrls: ['./cage-groups.component.scss']
})
export class CageGroupsComponent implements OnInit {
	@Input() OID: string;
	groups: CageGroup[];
	expandedGroup: CageGroup = null;
	selectedOption: CageGroup;
	
	constructor(private mibService: MIBService) {
		
	}

	ngOnInit() {
		this.mibService.getCageGroups(this.OID)
  			.subscribe(groups=> this.groups = groups);
	}

	toGroupTypeName(type: GroupType){
		return GroupType[type];
	}

	onSelect(selectedGroup: CageGroup){
		this.selectedOption = selectedGroup;
	}

	isSelected(group: CageGroup){
		return this.selectedOption == group;
	}

}
