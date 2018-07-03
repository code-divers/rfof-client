import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'rfof-cage-toolbar',
  templateUrl: './cage-toolbar.component.html',
  styleUrls: ['./cage-toolbar.component.scss']
})
export class CageToolbarComponent implements OnInit {
	@Input() OID: string;
	constructor() { }

	ngOnInit() {
		
	}

}
