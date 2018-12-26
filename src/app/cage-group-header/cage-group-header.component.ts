import { Component, OnInit, Input } from '@angular/core';
import { Cage, CageGroup, GroupType } from 'rfof-common';
import { MIBService } from '../mib.service';

@Component({
  selector: 'rfof-cage-group-header',
  templateUrl: './cage-group-header.component.html',
  styleUrls: ['./cage-group-header.component.scss']
})
export class CageGroupHeaderComponent implements OnInit {
	@Input() group: CageGroup;
	updating: boolean = false;
	error: string;
	done: boolean = false;

	constructor(private mibService: MIBService) { 

	}

	ngOnInit() {

	}

	toGroupTypeName(type: GroupType){
		return GroupType[type];
	}

	getGroupModules(group: CageGroup){
		return this.mibService.getCageGroupModules(group);
	}

	setName(){
		this.updating = true;
	    this.done = false;
	    this.error = null;
	    this.mibService.updateCageGroup(this.group).toPromise().then(result=>{
	      if(result){
	      	if(result && result.length > 0){
		      	result.map(item=>{
		          this.showMessage(`Successfully set name`);
		        })
		    }else{
		        this.error = `Failed to set name.`
		    }
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
