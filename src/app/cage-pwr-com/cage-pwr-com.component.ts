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
  powerInfo: PowerSupply[];

  constructor(private mibService: MIBService) { }

  ngOnInit() {
    this.powerInfo = this.power.filter((item)=>{
      return item.status < 3;
    });
  	this.mibService.dataChanged$
  		.subscribe(() => {
        this.powerInfo = this.mibService.power.filter((item)=>{
          return item.status < 3;
        });
      });
  }

  toPowerStatusName(status: PowerStatus){
  	return PowerStatus[status];
  }

  toSlotName(index: number){
  	return "PSU" + index + 1;
  }

}
