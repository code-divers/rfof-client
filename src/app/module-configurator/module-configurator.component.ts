import { Component, OnInit, InjectionToken, Inject} from '@angular/core';
import { CageModule, LNAStatus, LaserStatus, BiasTState, RfLinkTest, MonPlan, SetDefaults, RestoreFactory, ModuleType, MeasRfLevel } from 'rfof-common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { MIBService } from '../mib.service';
import { Observable } from 'rxjs';
import * as moment from 'moment';

@Component({
  selector: 'rfof-module-configurator',
  templateUrl: './module-configurator.component.html',
  styleUrls: ['./module-configurator.component.scss']
})
export class ModuleConfiguratorComponent implements OnInit {
	sampler;
	module: CageModule;
	originalModule: CageModule;
	message: string;
	constructor(
		@Inject(MAT_DIALOG_DATA) public data: any,
		private mibService: MIBService,
		public dialogRef: MatDialogRef<ModuleConfiguratorComponent>){
	}
	ngOnInit() {
		this.message = null;
		this.module = this.data.module;
		this.initiateModuleData(this.module);
		this.mibService.sensorsLoaded$.subscribe((updatedModule: CageModule)=>{
			if(updatedModule.slot == this.module.slot){
				this.module = updatedModule;
				this.initiateModuleData(this.module);
			}
		})
		this.mibService.dataChanged$.subscribe(()=>{
			let module = this.mibService.modules.find((module)=>{
				return module.slot == this.module.slot;
			})
			if(module){
				this.module = module;
				this.initiateModuleData(module);
			}
		})
	}

	initiateModuleData(module){
		this.originalModule = {... module};
		this.module.updating = false;
		this.module.lnaOn = module.lna == LNAStatus.on;
		this.module.lnaDisabled = module.lna == LNAStatus.none;
		this.module.attenValue = module.atten == '-----' ? null : module.atten;
		this.module.biasTDisabled = module.biasT == BiasTState.none;
		this.module.biasTValue = BiasTState[module.biasT];
		this.module.laserOn = module.laser == LaserStatus.on;
		this.module.laserDisabled = module.laser == LNAStatus.none;
		this.module.measRfLevelOn = module.measRfLevel == MeasRfLevel.on;
		this.module.monPlanValue = MonPlan[module.monPlan];
		this.module.rfLevelValue = module.rfLevel == '-----' ? null : module.rfLevel;
		this.module.rfLinkTestOn = module.rfLinkTest == RfLinkTest.on;
		this.module.rfLinkTestTime = module.rfLinkTestTime;
		this.module.monInterval = module.monInterval;

		let rfLinkTestTimeDuration = moment.duration(module.rfLinkTestTime).asSeconds();
		let rfTestTimerDuration = moment.duration(module.rfTestTimer).asSeconds();
		if(rfTestTimerDuration > 0){
			this.module.rfTestTimerLeft  = (rfTestTimerDuration / rfLinkTestTimeDuration)*100;
		}else{
			this.module.rfTestTimerLeft = 0;
		}

		let monIntervalDuration = moment.duration(module.monInterval).asSeconds();
		let monTimerDuration = moment.duration(module.monTimer).asSeconds();
		if(monTimerDuration > 0){
			this.module.monTimerLeft  = (monTimerDuration / monIntervalDuration)*100;
		}else{
			this.module.monTimerLeft = 0;
		}
	}

	revertToOriginalModuleState(){
		this.module = {... this.originalModule};
		this.initiateModuleData(this.module);
	}

	toBiasTName(value){
		return BiasTState[value];
	}

	toMonPlanName(value){
		return MonPlan[value];
	}

	toModuleTypeName(value){
		return ModuleType[value];
	}

	toggleRflinkTest(event){
		this.updateModule().then(result=>{
			this.showMessage(`Successfully set Attrnuation to ${this.module.attenValue}`);
		})
	}

	toggleLaser(event){
		this.updateModule().then(result=>{
			this.showMessage(`Successfully set Laser to ${this.module.laser}`);
		})
	}

	toggleLna(event){
		this.updateModule().then(result=>{
			this.showMessage(`Successfully set LNA to ${this.module.lna}`);
		})
	}

	toggleMeasRFLevel(event){
		this.updateModule().then(result=>{
			this.showMessage(`Successfully set RF link test to ${this.module.lna}`);
		})
	}

	setAtten(){
		this.updateModule().then(result=>{
			this.showMessage(`Successfully set Attrnuation to ${this.module.attenValue}`);
		})
	}

	setBiasT(){
		this.updateModule().then(result=>{
			this.showMessage(`Successfully set BiasT to ${this.module.biasTValue}`);
		})
	}

	setRfLevel($event){
		this.updateModule().then(result=>{
			console.log(result);
		})
	}

	setRfLinkTestTime(){
		this.updateModule().then(result=>{
			this.showMessage(`Successfully set RFLink Test time to ${this.module.rfLinkTestTime}`);
		})
	}

	setMonPlan($event){
		this.updateModule().then(result=>{
			console.log(result);
		})
	}

	setMonInterval(value){
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
			//this.dialogRef.close();
		})

	}

	restoreFactory($event){
		this.module.restoreFactory = RestoreFactory.restoreFactory;
		this.updateModule().then(result=>{
			console.log(result);
			//this.dialogRef.close();
		})
	}

	async updateModule(){
		this.module.updating = true;
		try{
			let updatedModule = {... this.module};
			updatedModule.lna = updatedModule.lnaDisabled ? LNAStatus.none : updatedModule.lnaOn ? LNAStatus.on : LNAStatus.off;
			updatedModule.atten = updatedModule.attenValue;
			updatedModule.laser = updatedModule.laserDisabled ? LaserStatus.none : updatedModule.laserOn ? LaserStatus.on : LaserStatus.off;
			updatedModule.measRfLevel = updatedModule.measRfLevelOn ? MeasRfLevel.on : MeasRfLevel.off;
			updatedModule.rfLinkTest = updatedModule.rfLinkTestOn ? RfLinkTest.on : RfLinkTest.off;
			let rfLinkTestTime = updatedModule.rfLinkTestTime;
			let matches = updatedModule.rfLinkTestTime.match(/([\d]{2})/g);
			if(matches.length < 3){
				rfLinkTestTime += ':00';
			}
			updatedModule.rfLinkTestTime = rfLinkTestTime;
			updatedModule.monPlan = MonPlan[updatedModule.monPlanValue];
			let monInterval = updatedModule.monInterval;
			matches = updatedModule.monInterval.match(/([\d]{2})/g);
			if(matches.length < 3){
				monInterval += ':00';
			}
			updatedModule.monInterval = monInterval;
			if(updatedModule!=this.module){
				let result = await this.mibService.updateCageModule(updatedModule).toPromise();
				if(result.length == 0){
					this.revertToOriginalModuleState();
					this.showMessage(`Failed to update module.`)
				}
				return result;
			}
		}catch(err){
			this.revertToOriginalModuleState();
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
