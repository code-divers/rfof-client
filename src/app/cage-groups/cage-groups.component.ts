import { Component, OnInit, Input } from '@angular/core';
import { first} from 'rxjs/operators';
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
  		this.moduleManagerService.moduleSelected$.subscribe(selected=>{
			this.selectedModules = selected;
		});
		this.groups.map((group)=>{
			this.selectAll(group);
		})
	}

	getGroupModules(group: CageGroup){
		return this.mibService.getCageGroupModules(group);
	}


	selectAll(group: CageGroup){
		let modules = this.mibService.getCageGroupModules(group);
		for(var module of modules){
			this.moduleManagerService.selectModule({
				module: module,
				isOpen: false
			});
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
