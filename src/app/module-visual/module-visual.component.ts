import {
	Component, 
	OnInit, 
	Input,
	QueryList,
	ViewChild,
	ViewChildren,
	ViewContainerRef,
	ViewEncapsulation, 
	Injector, 
	ElementRef } from '@angular/core';
import {Overlay, CdkOverlayOrigin, OverlayConfig, OverlayRef, ConnectedPosition} from '@angular/cdk/overlay';
import {
  ComponentPortal,
  // tslint:disable-next-line:no-unused-variable
  Portal,
  TemplatePortalDirective,
  PortalInjector
} from '@angular/cdk/portal';
import { CageModule } from '../cage';
import { POPUP_DATA, MODULE_MANAGER_SERVICE, ModulePopupComponent } from '../module-popup/module-popup.component';
import { ClickOutsideDirective } from '../click-outside.directive';
import { ModuleManagerService } from '../module-manager.service';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'rfof-module-visual',
  templateUrl: './module-visual.component.html',
  styleUrls: ['./module-visual.component.scss']
})
export class ModuleVisualComponent implements OnInit {
	@ViewChild(CdkOverlayOrigin) _overlayOrigin: CdkOverlayOrigin;
	@Input() module: CageModule;
	private injector: Injector;
	private overlayRef: any;
	private componentPortl: ComponentPortal<ModulePopupComponent>;

	constructor(private _eref: ElementRef, public overlay: Overlay, public viewContainerRef: ViewContainerRef, private moduleManagerService: ModuleManagerService,
		public dialog: MatDialog) { }

	ngOnInit() {
		this.moduleManagerService.moduleSelected$.subscribe(selectedModules=>{
			var idx = selectedModules.findIndex((selected)=>{ return selected.module == this.module});
			if(idx > -1){
				this.openPanel(false);
			}else{
				this.closePanel();
			}
		});
	}

	onClick(){
		var option = {
			module: this.module,
			isOpen: false
		}
		this.moduleManagerService.selectModule(option);
	}

	openPanel(backdrop: boolean = false){
		if(!this.overlayRef){
			let position: ConnectedPosition = this.module.slot < 4 ? {
				offsetX: -15,
				offsetY: 15,
				originX: "center",
				originY: "center",
				overlayX: "start",
				overlayY: "bottom",
				weight: 1
			} : {
				offsetX: -15,
				offsetY: -15,
				originX: "center",
				originY: "center",
				overlayX: "start",
				overlayY: "top",
				weight: 1
			};
			let strategy = this.overlay.position()
			.flexibleConnectedTo(this._overlayOrigin.elementRef)
			.withPositions([position]);


			let config = new OverlayConfig({
				hasBackdrop: backdrop,
				positionStrategy: strategy,
				scrollStrategy: this.overlay.scrollStrategies.block()
			});
			const popupConfig = { ...{ module: this.module }, ...config };
			let overlayRef = this.overlay.create(popupConfig);
			
			overlayRef.backdropClick().subscribe(() => {
		      overlayRef.dispose();
		    });
			
			const injectionTokens = new WeakMap();
	    	injectionTokens.set(POPUP_DATA, popupConfig.module);
	    	injectionTokens.set(MODULE_MANAGER_SERVICE, this.moduleManagerService);

			const injector = new PortalInjector(this.injector, injectionTokens);

			this.componentPortl = new ComponentPortal(ModulePopupComponent, this.viewContainerRef, injector);

			overlayRef.attach(this.componentPortl);
			this.overlayRef = overlayRef;
		}
	}

	closePanel(){
		if(this.overlayRef){
			this.overlayRef.dispose();
			this.overlayRef = null;
		}
	}

	openConfigurator(){
		
	}
}


