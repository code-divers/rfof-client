import { Component, OnInit, Input, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { EventLogItem } from 'rfof-common';
import { MIBService } from '../mib.service';

@Component({
  selector: 'rfof-cage-eventlog',
  templateUrl: './cage-eventlog.component.html',
  styleUrls: ['./cage-eventlog.component.scss']
})
export class CageEventlogComponent implements OnInit {
	@Input() events: EventLogItem[];
	displayedColumns: string[] = ['time', 'detail', 'group', 'slot', 'level'];
	dataSource: MatTableDataSource<EventLogItem>;
	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;

	constructor(private changeDetectorRefs: ChangeDetectorRef,private mibService: MIBService) { 
	}

	ngOnInit() {
		this.dataSource=new MatTableDataSource<EventLogItem>(this.events);
		this.dataSource.paginator = this.paginator;
		this.dataSource.sort = this.sort;
		this.mibService.eventLoaded$.subscribe((events)=>{
			this.dataSource.data = events;
		})
	}

}
