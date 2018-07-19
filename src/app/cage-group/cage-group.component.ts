import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CageGroup, CageModule, ModuleType } from '../cage';
import { MIBService } from '../mib.service';
import { ModuleManagerService, SelectedModule } from '../module-manager.service';

@Component({
  selector: 'rfof-cage-group',
  templateUrl: './cage-group.component.html',
  styleUrls: ['./cage-group.component.scss']
})
export class CageGroupComponent implements OnInit {
	@Input() group: CageGroup;
	@Output() selected = new EventEmitter<CageGroup>();
	modules: CageModule[];
	selectedOptions: SelectedModule[] = [];
	
	constructor(private mibService: MIBService, private moduleManagerService: ModuleManagerService) {

	}

	ngOnInit() {
		this.mibService.getCageGroupModule(this.group)
			.subscribe(modules => this.modules = modules);

		this.moduleManagerService.moduleSelected$.subscribe(selected=>{
			this.selectedOptions = selected.filter((item)=>{
				return this.modules.indexOf(item.module) > -1
			});
		});
	}

	toModuleTypeName(type: ModuleType){
		return ModuleType[type];
	}

	toggleModule(module:CageModule){
		var idx = this.selectedOptions.findIndex((option)=>{return option.module.name==module.name});
		if(idx == -1){
			var option = {
				module: module,
				isOpen: false
			};
			this.moduleManagerService.selectModule(option);
		}else{
			this.moduleManagerService.deselectModule(this.selectedOptions[idx]);
		}
	}

	toStateClass(module: CageModule){
		var selectedOption = this.selectedOptions.find((option)=>{return option.module==module});
		if(selectedOption){
			return selectedOption.isOpen ? "opened-module" : "selected-module";
		}
		return null;
	}
}





