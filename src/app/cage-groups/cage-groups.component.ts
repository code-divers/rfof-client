import { Component, OnInit, Input } from '@angular/core';
import { MIBService } from '../mib.service';
import { CageGroup, GroupType } from '../cage';
import { ModuleManagerService, SelectedModule } from '../module-manager.service';
 
@Component({
  selector: 'rfof-cage-groups',
  templateUrl: './cage-groups.component.html',
  styleUrls: ['./cage-groups.component.scss']
})
export class CageGroupsComponent implements OnInit {
	@Input() OID: string;
	groups: CageGroup[];
	selectedModules: SelectedModule[] = [];
	
	constructor(private mibService: MIBService, private moduleManagerService: ModuleManagerService) {
	}

	ngOnInit() {
		this.mibService.getCageGroups(this.OID)
  			.subscribe(groups=> this.groups = groups);
  		this.moduleManagerService.moduleSelected$.subscribe(selected=>{
			this.selectedModules = selected; //.filter((option)=>{return option.source!='image'});
		});
	}

	toGroupTypeName(type: GroupType){
		return GroupType[type];
	}

	selectAll(group: CageGroup){
		if(this.selectedModules.length == 0){
			this.mibService.getCageGroupModule(group).subscribe((modules)=>{
				for(var module of modules){
					this.moduleManagerService.selectModule({
						module: module,
						isOpen: false
					});
				}
			})
		}
	}

	closeAll(group: CageGroup){
		this.mibService.getCageGroupModule(group).subscribe((modules)=>{
			for(var module of modules){
				this.moduleManagerService.deselectModule({
					module: module,
					isOpen: false
				});
			}
		})
	}

	isSelected(group: CageGroup){
		return this.selectedModules.find((option)=>{
			return option.module.group == group;
		}) != null;
	}

}
