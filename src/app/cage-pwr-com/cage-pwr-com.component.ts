import { Component, OnInit, Input } from '@angular/core';
import { PowerSupply, TrapReciver, PowerStatus } from '../cage';
import { MIBService } from '../mib.service';

@Component({
  selector: 'rfof-cage-pwr-com',
  templateUrl: './cage-pwr-com.component.html',
  styleUrls: ['./cage-pwr-com.component.scss']
})
export class CagePwrComComponent implements OnInit {
	@Input() OID: string;
	powers: PowerSupply[];
	traps: TrapReciver[];

  constructor(private mibService: MIBService) { }

  ngOnInit() {
  	this.mibService.getCagePowerSupply(this.OID)
  		.subscribe(powers => this.powers = powers);
  	this.mibService.getCageTrapReciver(this.OID)
  		.subscribe(traps => this.traps = traps);
  }

  toPowerStatusName(status: PowerStatus){
  	return PowerStatus[status];
  }

  toSlotName(index: number){
  	return "PSU0" + index;
  }

}
