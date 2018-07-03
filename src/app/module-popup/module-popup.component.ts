import { Component, OnInit, Input, Inject, InjectionToken} from '@angular/core';
import { CageModule } from '../cage';

export const POPUP_DATA = new InjectionToken<CageModule>('POPUP_DATA');

@Component({
  selector: 'rfof-module-popup',
  templateUrl: './module-popup.component.html',
  styleUrls: ['./module-popup.component.scss']
})
export class ModulePopupComponent implements OnInit {
	
	constructor(@Inject(POPUP_DATA) public module: CageModule) { 

	}

	ngOnInit() {
		
	}

}
