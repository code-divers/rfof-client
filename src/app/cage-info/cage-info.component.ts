import { Component, Input, OnInit } from '@angular/core';
import { Cage, CageGroup } from 'rfof-common';
import { MIBService } from '../mib.service';

@Component({
  selector: 'rfof-cage-info',
  templateUrl: './cage-info.component.html',
  styleUrls: ['./cage-info.component.scss']
})
export class CageInfoComponent implements OnInit {
	@Input() cage: Cage;
  updating: boolean = false;
  error: string;
  done: boolean = false;
  constructor(private mibService: MIBService) { 
  //Get cage information using the MIBService

  }

  ngOnInit() {

  }

  setName(){
    this.updating = true;
    this.done = false;
    this.error = null;
    this.mibService.updateCageSettings(this.cage.settings).toPromise().then(result=>{
      if(result.length == 0){
        this.error = `Failed to set name.`
      }else{
        result.map(item=>{
          this.showMessage(`Successfully set name`);
        })
      }
      this.updating = false;
    }).catch(err=>{
      this.error = `Failed to set name. with ${err}`;
      this.updating = false;
    });
  }

  showMessage(message){
    this.done = true;
    let self = this;
    setTimeout(()=>{self.done = false}, 3000);
  }

}
