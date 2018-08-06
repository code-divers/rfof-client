import { Component, OnInit, Input } from '@angular/core';
import { EventLogItem } from '../cage';

@Component({
  selector: 'rfof-cage-toolbar',
  templateUrl: './cage-toolbar.component.html',
  styleUrls: ['./cage-toolbar.component.scss']
})
export class CageToolbarComponent implements OnInit {
	@Input() events: EventLogItem[];
	constructor() { }

	ngOnInit() {
		
	}

}
