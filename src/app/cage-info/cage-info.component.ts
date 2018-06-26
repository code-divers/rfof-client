import { Component, Input, OnInit } from '@angular/core';
import { Cage } from '../cage';
import { MIBService } from '../mib.service';

@Component({
  selector: 'rfof-cage-info',
  templateUrl: './cage-info.component.html',
  styleUrls: ['./cage-info.component.scss']
})
export class CageInfoComponent implements OnInit {
	  @Input() OID: string;
    cage: Cage;
  	constructor(private mibService: MIBService) { 
  		//Get cage information using the MIBService

  	}

  	getInfo(): void{
  		this.mibService.getCageInfo(this.OID)
  			.subscribe(cage=> this.cage = cage);
  	}

  	ngOnInit() {
  		this.getInfo();
  	}

}
