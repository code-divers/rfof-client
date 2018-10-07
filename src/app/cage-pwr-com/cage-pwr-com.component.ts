import { Component, OnInit, Input } from '@angular/core';
import { PowerSupply, TrapReciver, PowerStatus } from 'rfof-common';
import { MIBService } from '../mib.service';

@Component({
  selector: 'rfof-cage-pwr-com',
  templateUrl: './cage-pwr-com.component.html',
  styleUrls: ['./cage-pwr-com.component.scss']
})
export class CagePwrComComponent implements OnInit {
	@Input() power: PowerSupply[];
	@Input() network: TrapReciver[];

  constructor(private mibService: MIBService) { }

  ngOnInit() {
  	/*this.mibService.dataChanged$
  		.subscribe(() => {
        this.powers = this.mibService.power;
        this.traps = this.mibService.network;
      });*/
  }

  toPowerStatusName(status: PowerStatus){
  	return PowerStatus[status];
  }

  toSlotName(index: number){
  	return "PSU0" + index;
  }

}
