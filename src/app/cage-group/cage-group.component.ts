import { Component, OnInit, Input, Output, EventEmitter, InjectionToken, Injector, ViewChild, ViewContainerRef } from '@angular/core';
import { CageGroup, CageModule, ModuleType } from 'rfof-common';
import { MIBService } from '../mib.service';
import { ModuleConfiguratorComponent} from '../module-configurator/module-configurator.component';
import { ModuleManagerService, SelectedModule } from '../module-manager.service';
import { ComponentPortal, PortalInjector } from '@angular/cdk/portal';
import { Overlay, CdkOverlayOrigin, OverlayConfig, OverlayRef, ConnectedPosition } from '@angular/cdk/overlay';

import { MatDialog, MatDialogRef } from '@angular/material';

@Component({
  selector: 'rfof-cage-group',
  templateUrl: './cage-group.component.html',
  styleUrls: ['./cage-group.component.scss']
})
export class CageGroupComponent implements OnInit {
	@Input() group: CageGroup;
	@Output() selected = new EventEmitter<CageGroup>();
	@Input() modules: CageModule[] = [];
	selectedOptions: SelectedModule[] = [];

	@ViewChild(CdkOverlayOrigin) _overlayOrigin: CdkOverlayOrigin;
	injector: Injector;
	componentPortl: ComponentPortal<ModuleConfiguratorComponent>;

	configuratorTool: MatDialogRef<ModuleConfiguratorComponent>;
	
	constructor(
		private dialog: MatDialog,
		private overlay: Overlay,
		private mibService: MIBService, 
		private moduleManagerService: ModuleManagerService, 
		private viewContainerRef: ViewContainerRef) {}

	ngOnInit() {
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
			
		}
		//this.openConfigurator(module);
		this.openConfiguratorTool(module);
		/*else{
			this.moduleManagerService.deselectModule(this.selectedOptions[idx]);
		}*/
	}

	openConfiguratorTool(module) {
	    this.configuratorTool = this.dialog.open(ModuleConfiguratorComponent, {
	    	data: {
	    		module: module,
	    		mibService: this.mibService
	    	},
	    	panelClass: 'container-panel'
	    });
	  }

	toStateClass(module: CageModule){
		var selectedOption = this.selectedOptions.find((option)=>{return option.module==module});
		if(selectedOption){
			return selectedOption.isOpen ? "opened-module" : "selected-module";
		}
		return null;
	}

	openConfigurator(module: CageModule){
		let strategy = this.overlay.position()
		.global().centerHorizontally().centerVertically();


		let config = new OverlayConfig({
			hasBackdrop: false,
			positionStrategy: strategy,
			scrollStrategy: this.overlay.scrollStrategies.block()
		});
		const popupConfig = { ...{ module: module }, ...config };
		let overlayRef = this.overlay.create(popupConfig);
		
		overlayRef.backdropClick().subscribe(() => {
	      overlayRef.dispose();
	    });
		
		const injectionTokens = new WeakMap();
    	//injectionTokens.set(MODULE_DATA, popupConfig.module);
    	//injectionTokens.set(MODULE_MANAGER_SERVICE, this.moduleManagerService);

		const injector = new PortalInjector(this.injector, injectionTokens);

		this.componentPortl = new ComponentPortal(ModuleConfiguratorComponent, this.viewContainerRef, injector);

		overlayRef.attach(this.componentPortl);
	}
}





