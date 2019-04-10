import { Component, OnInit, Input } from '@angular/core';
import { CageModule, ModuleType } from 'rfof-common';
import { ModuleConfiguratorComponent} from '../module-configurator/module-configurator.component';
import { MatDialog, MatDialogRef } from '@angular/material';
import { MIBService } from '../mib.service';

@Component({
  selector: 'rfof-cage-group-module',
  templateUrl: './cage-group-module.component.html',
  styleUrls: ['./cage-group-module.component.scss']
})
export class CageGroupModuleComponent implements OnInit {
	@Input() module: CageModule;
	configuratorTool: MatDialogRef<ModuleConfiguratorComponent>;
	
	constructor(private dialog: MatDialog, private mibService: MIBService) { }

	ngOnInit() {
		this.mibService.sensorsLoaded$.subscribe(updatedModule=>{
			if(updatedModule.slot == this.module.slot){
				this.module = updatedModule;
			}
  		})
  		this.mibService.dataChanged$.subscribe(data=>{
  			if(!this.mibService.modules)
  				return;
  			let idx = this.mibService.modules.findIndex((item)=>{
		        return item.slot == this.module.slot;
		      });
			if(idx > -1){
				this.module = this.mibService.modules[idx];
			}
  		})
	}

	toModuleTypeName(value){
		return ModuleType[value];
	}

	openConfiguratorTool() {
	    this.configuratorTool = this.dialog.open(ModuleConfiguratorComponent, {
	    	data: {
	    		module: this.module,
	    		mibService: this.mibService
	    	},
	    	panelClass: 'container-panel'
	    });
	}

}
