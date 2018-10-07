import { Component, OnInit, Input } from '@angular/core';
import { MIBService } from '../mib.service';
import { CageGroup, GroupType } from 'rfof-common';
import { ModuleManagerService, SelectedModule } from '../module-manager.service';
 
@Component({
  selector: 'rfof-cage-groups',
  templateUrl: './cage-groups.component.html',
  styleUrls: ['./cage-groups.component.scss']
})
export class CageGroupsComponent implements OnInit {
	@Input() groups: CageGroup[];
	selectedModules: SelectedModule[] = [];
	
	constructor(private mibService: MIBService, private moduleManagerService: ModuleManagerService) {
	}

	ngOnInit() {
		/*this.mibService.dataChanged$
  			.subscribe(()=> this.groups = this.mibService.groups);*/
  		this.moduleManagerService.moduleSelected$.subscribe(selected=>{
			this.selectedModules = selected; //.filter((option)=>{return option.source!='image'});
		});
	}

	getGroupModules(group: CageGroup){
		return this.mibService.getCageGroupModules(group);
	}

	toGroupTypeName(type: GroupType){
		return GroupType[type];
	}

	selectAll(group: CageGroup){
		if(this.selectedModules.length == 0){
			let modules = this.mibService.getCageGroupModules(group);
			for(var module of modules){
				this.moduleManagerService.selectModule({
					module: module,
					isOpen: false
				});
			}
		}
	}

	closeAll(group: CageGroup){
		let modules = this.mibService.getCageGroupModules(group);
		for(var module of modules){
			this.moduleManagerService.deselectModule({
				module: module,
				isOpen: false
			});
		}
	}

	isSelected(group: CageGroup){
		return this.selectedModules.find((option)=>{
			return option.module.group.name == group.name;
		}) != null;
	}

}
