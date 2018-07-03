import { Component, OnInit, Input } from '@angular/core';
import { CageGroup } from '../cage';

@Component({
  selector: 'rfof-group-switch',
  templateUrl: './group-switch.component.html',
  styleUrls: ['./group-switch.component.scss']
})
export class GroupSwitchComponent implements OnInit {
	@Input() group: CageGroup;
	
	constructor() { }

	ngOnInit() {
	}

}
