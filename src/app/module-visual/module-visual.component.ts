import { Component, OnInit,Input } from '@angular/core';
import { CageModule, ModuleType, BiasTState } from 'rfof-common';
import { ModuleManagerService } from '../module-manager.service';
import { ModuleConfiguratorComponent} from '../module-configurator/module-configurator.component';
import { MatDialog, MatDialogRef } from '@angular/material';

@Component({
  selector: 'rfof-module-visual',
  templateUrl: './module-visual.component.html',
  styleUrls: ['./module-visual.component.scss']
})
export class ModuleVisualComponent implements OnInit {
	@Input() module: CageModule;
	configuratorTool: MatDialogRef<ModuleConfiguratorComponent>;

	constructor(private moduleManagerService: ModuleManagerService,
		public dialog: MatDialog) { }

	ngOnInit() {
		this.moduleManagerService.moduleSelected$.subscribe(selectedModules=>{
			var idx = selectedModules.findIndex((selected)=>{ return selected.module == this.module});
			/*if(idx > -1){
				this.openPanel(false);
			}else{
				this.closePanel();
			}*/
		});
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


