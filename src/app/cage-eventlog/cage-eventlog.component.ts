import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { EventLogItem } from '../cage';

@Component({
  selector: 'rfof-cage-eventlog',
  templateUrl: './cage-eventlog.component.html',
  styleUrls: ['./cage-eventlog.component.scss']
})
export class CageEventlogComponent implements OnInit {
	@Input() events: EventLogItem[];
	displayedColumns: string[] = ['time', 'detail', 'level'];
	dataSource: MatTableDataSource<EventLogItem>;
	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;

	constructor() { }

	ngOnInit() {
		this.dataSource=new MatTableDataSource<EventLogItem>(this.events);
		this.dataSource.paginator = this.paginator;
		this.dataSource.sort = this.sort;
	}

}
