import { Component, OnInit, InjectionToken, Inject} from '@angular/core';
import { CageModule, LNAStatus, BiasTState, RfLinkTest, MonPlan, SetDefaults, RestoreFactory } from 'rfof-common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { MIBService } from '../mib.service';

@Component({
  selector: 'rfof-module-configurator',
  templateUrl: './module-configurator.component.html',
  styleUrls: ['./module-configurator.component.scss']
})
export class ModuleConfiguratorComponent implements OnInit {
	module: CageModule;
	mibService: MIBService;
	message: string;
	constructor(
		@Inject(MAT_DIALOG_DATA) public data: any,
		public dialogRef: MatDialogRef<ModuleConfiguratorComponent>){
	}
	ngOnInit() {
		this.message = null;
		this.module = this.data.module;
		this.module.updating = false;
		this.mibService = this.data.mibService;
		this.module.lnaOn = this.module.lna == LNAStatus.on;
		this.module.lnaDisabled = this.module.lna == LNAStatus.none;
		this.module.attenValue = this.module.atten == '-----' ? null : this.module.atten;
		this.module.biasTDisabled = this.module.biasT == BiasTState.none;
		this.module.biasTValue = this.toBiasTName(this.module.biasT);
		this.module.laserOn = this.module.laser == LNAStatus.on;
		this.module.laserDisabled = this.module.laser == LNAStatus.none;
		this.module.monPlanValue = this.toMonPlanName(this.module.monPlan);
		this.module.rfLevelValue = this.module.rfLevel == '-----' ? null : this.module.rfLevel;
		this.module.rfLinkTestOn = this.module.rfLinkTest == RfLinkTest.on;
		
	}

	toBiasTName(value){
		return BiasTState[value];
	}

	toMonPlanName(value){
		return MonPlan[value];
	}

	toggleRflinkTest(event){
		//this.module.rfLinkTestOn = event.checked;
	}

	toggleLaser(event){
		this.updateModule().then(result=>{
			console.log(result);
		})
	}

	toggleLna(event){
		this.module.lnaOn = event.checked;
		this.updateModule().then(result=>{
			console.log(result);
		})
	}

	setAtten($event){
		this.updateModule().then(result=>{
			console.log(result);
		})
	}

	setBiasT(){
		this.updateModule().then(result=>{
			console.log(result);
		})
	}

	setRfLevel($event){
		this.updateModule().then(result=>{
			console.log(result);
		})
	}

	setMonPlan($event){
		this.updateModule().then(result=>{
			console.log(result);
		})
	}

	setMonInterval($event){
		this.updateModule().then(result=>{
			console.log(result);
		})
	}

	setOptAlarmLevel($event){
		this.updateModule().then(result=>{
			console.log(result);
		})
	}

	setDefaults($event){
		this.module.setDefaults = SetDefaults.setDefaults;
		this.updateModule().then(result=>{
			console.log(result);
			this.dialogRef.close();
		})

	}

	restoreFactory($event){
		this.module.restoreFactory = RestoreFactory.restoreFactory;
		this.updateModule().then(result=>{
			console.log(result);
			this.dialogRef.close();
		})
	}

	async updateModule(){
		this.module.updating = true;
		try{
			this.module.lna = this.module.lnaDisabled ? LNAStatus.none : this.module.lnaOn ? LNAStatus.on : LNAStatus.off;
			this.module.atten =this.module.attenValue;
			this.module.biasT = this.module.biasTDisabled ? BiasTState.none : BiasTState[this.module.biasTValue];
			this.module.laser = this.module.aserDisable ? LNAStatus.none : this.module.laserOn ? LNAStatus.on : LNAStatus.off;
			this.module.rfLevel = this.module.rfLevelValue;
			this.module.rfLinkTest = this.module.rfLinkTestOn ? RfLinkTest.on : RfLinkTest.off;
			this.module.monPlan = MonPlan[this.module.monPlanValue];
			let result = await this.mibService.updateCageModule(this.module).toPromise();
			if(result.length == 0){
				this.showMessage(`Failed to update module.`)
			}else{
				this.showMessage(result);
			}
			return result;
		}catch(err){
			this.showMessage(`Error: ${err.message}`);
		}finally{
			this.module.updating = false;
		}
	}

	showMessage(content){
		this.message = content;
		setTimeout(()=>{
			this.message = null;
		}, 15000)
	}

}
