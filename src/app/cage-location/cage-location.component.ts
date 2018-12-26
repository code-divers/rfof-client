import { Component, OnInit, Input } from '@angular/core';
import { Cage, CageSettings } from 'rfof-common';
import { MIBService } from '../mib.service';

@Component({
  selector: 'rfof-cage-location',
  templateUrl: './cage-location.component.html',
  styleUrls: ['./cage-location.component.scss']
})
export class CageLocationComponent implements OnInit {
	@Input() cage: Cage;
	updating: boolean = false;
	error: string;
	done: boolean = false;
	constructor(private mibService: MIBService) { }

	ngOnInit() {
		
	}

	setLocation(){
		this.updating = true;
		this.error = null;
		this.mibService.updateCageSettings(this.cage.settings).toPromise().then(result=>{
			if(result.length == 0){
				this.error = `Failed to set location.`
			}else{
				result.map(item=>{
					this.showMessage(`Successfully set location`);
				})
			}
			this.updating = false;
		}).catch(err=>{
			this.error = `Failed to set location. with ${err}`;
			this.updating = false;
		});
	}

	showMessage(message){
		this.done = true;
		let self = this;
		setTimeout(()=>{self.done = false}, 3000);
	}

}
