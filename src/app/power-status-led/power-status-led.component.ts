import { Component, OnInit, Input } from '@angular/core';
import { PowerStatus } from 'rfof-common';

@Component({
  selector: 'rfof-power-status-led',
  templateUrl: './power-status-led.component.html',
  styleUrls: ['./power-status-led.component.scss']
})
export class PowerStatusLedComponent implements OnInit {
	@Input() status: PowerStatus; 
  constructor() { }

  ngOnInit() {
  }

  toModuleStatusClass(){
    return {
      'led-failure': this.status == PowerStatus.failure,
      'led-ok': this.status == PowerStatus.ok,
      'led-unknown': this.status == PowerStatus.unknown
    }
  }

}
