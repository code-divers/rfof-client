import {
	Component, 
	OnInit, 
	Input,
	QueryList,
	ViewChild,
	ViewChildren,
	ViewContainerRef,
	ViewEncapsulation, 
	Injector } from '@angular/core';
import {Overlay, CdkOverlayOrigin, OverlayConfig, OverlayRef} from '@angular/cdk/overlay';
import {
  ComponentPortal,
  // tslint:disable-next-line:no-unused-variable
  Portal,
  TemplatePortalDirective,
  PortalInjector
} from '@angular/cdk/portal';
import { CageModule } from '../cage';
import { POPUP_DATA, ModulePopupComponent } from '../module-popup/module-popup.component';



@Component({
  selector: 'rfof-module-visual',
  templateUrl: './module-visual.component.html',
  styleUrls: ['./module-visual.component.scss']
})
export class ModuleVisualComponent implements OnInit {
	@ViewChild(CdkOverlayOrigin) _overlayOrigin: CdkOverlayOrigin;
	@Input() module: CageModule;
	private injector: Injector;

	constructor(public overlay: Overlay, public viewContainerRef: ViewContainerRef) { }

	ngOnInit() {
		
	}

	openPanel(){
		let strategy = this.overlay.position()
	    .connectedTo(
	        this._overlayOrigin.elementRef,
	        {originX: 'start', originY: 'bottom'},
	        {overlayX: 'start', overlayY: 'top'} );

		let config = new OverlayConfig({positionStrategy: strategy});
		const popupConfig = { ...{
			module: this.module
		}, ...config };
		let overlayRef = this.overlay.create(popupConfig);

		const injectionTokens = new WeakMap();
    	injectionTokens.set(POPUP_DATA, popupConfig.module);

		const injector = new PortalInjector(this.injector, injectionTokens);

		overlayRef.attach(new ComponentPortal(ModulePopupComponent, this.viewContainerRef, injector));
	}
}


