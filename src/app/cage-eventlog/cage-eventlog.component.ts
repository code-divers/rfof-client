import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { EventLogItem } from '../cage';
import { MIBService } from '../mib.service';

@Component({
  selector: 'rfof-cage-eventlog',
  templateUrl: './cage-eventlog.component.html',
  styleUrls: ['./cage-eventlog.component.scss']
})
export class CageEventlogComponent implements OnInit {
	@Input() OID: string;
	displayedColumns: string[] = ['time', 'detail', 'level'];
	dataSource: MatTableDataSource<EventLogItem>;
	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;

	constructor(private mibService: MIBService) { }

	ngOnInit() {
		this.mibService.getCageEventLog(this.OID)
			.subscribe(eventLog=>{
				this.dataSource=new MatTableDataSource<EventLogItem>(eventLog);
				this.dataSource.paginator = this.paginator;
				this.dataSource.sort = this.sort;
			});
	}

}
