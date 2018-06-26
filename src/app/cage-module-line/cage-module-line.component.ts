import { Component, OnInit, Input } from '@angular/core';
import { CageModule } from '../cage';

@Component({
  selector: 'rfof-cage-module-line',
  templateUrl: './cage-module-line.component.html',
  styleUrls: ['./cage-module-line.component.scss']
})
export class CageModuleLineComponent implements OnInit {
	@Input() module: CageModule; 
	constructor() { }

	ngOnInit() {
	}

}
