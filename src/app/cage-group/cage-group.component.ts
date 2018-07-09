import { Component, OnInit, Input } from '@angular/core';
import { CageGroup, CageModule, ModuleType } from '../cage';
import { MIBService } from '../mib.service';
import { ModuleManagerService } from '../module-manager.service';

@Component({
  selector: 'rfof-cage-group',
  templateUrl: './cage-group.component.html',
  styleUrls: ['./cage-group.component.scss']
})
export class CageGroupComponent implements OnInit {
	@Input() group: CageGroup;
	modules: CageModule[];
	selectedOptions: CageModule[] = [];
	private lastSelectedOptions: CageModule[] = [];
	
	constructor(private mibService: MIBService, private moduleManagerService: ModuleManagerService) {

	}

	ngOnInit() {
		this.mibService.getCageGroupModule(this.group)
			.subscribe(modules => this.modules = modules);
		this.moduleManagerService.moduleSelected$.subscribe(module=>{
			var index = this.lastSelectedOptions.indexOf(module);
			if(index > -1){
				this.selectedOptions.slice(index, 1);
			}else{
				this.selectedOptions.push(module);
			}
		});
	}

	toModuleTypeName(type: ModuleType){
		return ModuleType[type];
	}

	onNgModelChange(options){
		var selected = options.filter(item=>this.lastSelectedOptions.indexOf(item) < 0);
		var module: any;
		for(module of selected){
			this.moduleManagerService.selectModule(module);
		}
		var deselected = this.lastSelectedOptions.filter(item=>options.indexOf(item) < 0);
		for(module of deselected){
			this.moduleManagerService.deselectModule(module);
		}
		this.lastSelectedOptions = options;
	}


}
