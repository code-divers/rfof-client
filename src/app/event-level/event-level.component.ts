import { Component, OnInit, Input } from '@angular/core';
import { EventLevel } from '../cage';

@Component({
  selector: 'rfof-event-level',
  templateUrl: './event-level.component.html',
  styleUrls: ['./event-level.component.scss']
})
export class EventLevelComponent implements OnInit {
 	@Input() level: EventLevel;
 	levelName: string;
	constructor() { }

	ngOnInit() {
		this.levelName = EventLevel[this.level];
	}

}
