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
import {Overlay, CdkOverlayOrigin, OverlayConfig, OverlayRef} from '@angular/cdk/overlay';
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

	constructor(private _eref: ElementRef, public overlay: Overlay, public viewContainerRef: ViewContainerRef, private moduleManagerService: ModuleManagerService) { }

	ngOnInit() {
		this.moduleManagerService.moduleSelected$.subscribe(module=>{
			if(module.name == this.module.name){
				this.openPanel(false);
			}
		});
		this.moduleManagerService.moduleDeselected$.subscribe(module=>{
			if(module.name == this.module.name){
				this.closePanel();
			}
		});
	}

	onClick(){
		this.moduleManagerService.selectModule(this.module);
	}

	openPanel(backdrop: boolean = false){
		if(!this.overlayRef){
			let strategy = this.overlay.position()
			.flexibleConnectedTo(this._overlayOrigin.elementRef)
			.withPositions([{
				offsetX: -15,
				offsetY: -15,
				originX: 'center',
				originY: 'center',
				overlayX: 'start',
				overlayY: 'top',
				weight: 1
			}]);

			let config = new OverlayConfig({
				hasBackdrop: backdrop,
				positionStrategy: strategy
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
}


