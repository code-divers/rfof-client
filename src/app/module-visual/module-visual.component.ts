import { Component, OnInit,Input } from '@angular/core';
import { CageModule, ModuleType, BiasTState } from 'rfof-common';
import { ModuleManagerService } from '../module-manager.service';
import { ModuleConfiguratorComponent} from '../module-configurator/module-configurator.component';
import { MatDialog, MatDialogRef } from '@angular/material';
import { MIBService } from '../mib.service';

@Component({
  selector: 'rfof-module-visual',
  templateUrl: './module-visual.component.html',
  styleUrls: ['./module-visual.component.scss']
})
export class ModuleVisualComponent implements OnInit {
	@Input() module: CageModule;
	configuratorTool: MatDialogRef<ModuleConfiguratorComponent>;

	constructor(private moduleManagerService: ModuleManagerService,
		public dialog: MatDialog, private mibService: MIBService) { }

	ngOnInit() {
		this.moduleManagerService.moduleSelected$.subscribe(selectedModules=>{
			var idx = selectedModules.findIndex((selected)=>{ return selected.module == this.module});
			/*if(idx > -1){
				this.openPanel(false);
			}else{
				this.closePanel();
			}*/
		});
		this.mibService.sensorsLoaded$.subscribe(updatedModule=>{
			if(updatedModule.slot == this.module.slot){
				this.module = updatedModule;
			}
  		})
  		this.mibService.dataChanged$.subscribe(data=>{
  			let idx = this.mibService.modules.findIndex((item)=>{
		        return item.slot == this.module.slot;
		      });
			if(idx > -1){
				this.module = this.mibService.modules[idx];
			}
  		})
	}

	toTypeName(type){
		return ModuleType[type];
	}

	toBiasTName(state){
		return BiasTState[state];
	}

	isNotBiasTNone(){
		return this.module.biasT != BiasTState.none;
	}

	getGroupName(){
		let cageGroups = this.mibService.groups;
		let res = /^(\d).(\d)/.exec(this.module.index);
		if (res) {
			let groupIndex = Number(res[1]) - 1;
			return cageGroups[groupIndex].name;
		}
		return null
	}

	onConfigure(module){
		this.configuratorTool = this.dialog.open(ModuleConfiguratorComponent, {
	    	data: {
	    		module: module,
	    		mibService: this.moduleManagerService
	    	},
	    	panelClass: 'container-panel'
	    });
	}
}


