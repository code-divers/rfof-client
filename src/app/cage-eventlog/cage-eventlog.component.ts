import { Component, OnInit, Input } from '@angular/core';
import { EventLogItem } from '../cage';
import { MIBService } from '../mib.service';

@Component({
  selector: 'rfof-cage-eventlog',
  templateUrl: './cage-eventlog.component.html',
  styleUrls: ['./cage-eventlog.component.scss']
})
export class CageEventlogComponent implements OnInit {
	@Input() OID: string;
	events: EventLogItem[];
	displayedColumns: string[] = ['time', 'level', 'detail'];

	constructor(private mibService: MIBService) { }

	ngOnInit() {
		this.mibService.getCageEventLog(this.OID)
			.subscribe(eventLog=>{console.log(eventLog);this.events=eventLog});
	}

}
