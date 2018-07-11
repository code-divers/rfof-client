import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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
	@Output() selected = new EventEmitter<CageGroup>();
	modules: CageModule[];
	selectedOptions: CageModule[] = [];
	private lastSelectedOptions: CageModule[] = [];
	private _selectAll: CageGroup;
	@Input()
	set selectAll(selected: CageGroup) {
		this._selectAll = selected;
		if(this.group == selected){
			this.selectedOptions = this.modules;
		}else{
			this.selectedOptions = [];
		}
		this.onNgModelChange(this.selectedOptions);
	}
	get selectAll(): CageGroup { return this._selectAll; }
	
	constructor(private mibService: MIBService, private moduleManagerService: ModuleManagerService) {

	}

	ngOnInit() {
		this.mibService.getCageGroupModule(this.group)
			.subscribe(modules => this.modules = modules);

		this.moduleManagerService.moduleSelected$.subscribe(modules=>{
			this.selectedOptions = modules.filter((item)=>this.modules.indexOf(item) > -1);
			/*if(this.selectedOptions.length > 0){
				this.selected.emit(this.group);
			}*/
		});
	}

	toModuleTypeName(type: ModuleType){
		return ModuleType[type];
	}

	onNgModelChange(options){
		console.log('module change')
		var selected = options.filter(item=>this.lastSelectedOptions.indexOf(item) < 0);
		var module: any;
		for(module of selected){
			this.moduleManagerService.selectModule(module);
		}
		var deselected = this.lastSelectedOptions.filter(item=>options.indexOf(item) < 0);
		for(module of deselected){
			this.moduleManagerService.deselectModule(module);
		}
		/*if(this.selectedOptions.length > 0){
			this.selected.emit(this.group);
		}*/
		this.lastSelectedOptions = options;
	}


}
