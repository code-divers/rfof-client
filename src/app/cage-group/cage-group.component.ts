import { Component, OnInit, Input } from '@angular/core';
import { CageGroup, CageModule } from '../cage';
import { MIBService } from '../mib.service';

@Component({
  selector: 'rfof-cage-group',
  templateUrl: './cage-group.component.html',
  styleUrls: ['./cage-group.component.scss']
})
export class CageGroupComponent implements OnInit {
	@Input() group: CageGroup;
	modules: CageModule[];
	
	constructor(private mibService: MIBService) {

	}

	ngOnInit() {
		this.mibService.getCageGroupModule(this.group)
			.subscribe(modules => this.modules = modules);
	}

}
