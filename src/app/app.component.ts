import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { MessageService } from './message.service';
import { delay } from 'rxjs/internal/operators';
import { MIBService } from './mib.service';
import { ModuleManagerService } from './module-manager.service'
import { ConfigOption } from 'rfof-common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
	snackbarRef;
	cage;
	groups;
	modules;
	power;
	network;
	events;
	constructor(private mibService: MIBService, private messageService: MessageService, private moduleManagerService:ModuleManagerService, public snackBar: MatSnackBar){

	}

	ngOnInit(){
		this.messageService.observableLog$.pipe(delay(500)).subscribe((messages)=>{
			var message = messages[messages.length-1];
			this.snackBar.open(message, 'Close',{
				duration: 10000
			})
		})
		this.mibService.dataLoading$.pipe(delay(500)).subscribe((isLoading)=>{
			if(!isLoading && this.snackbarRef){
				this.snackBar.dismiss();
				this.snackbarRef = null;
			}else{
				this.snackbarRef = this.snackBar.open('Fetching cage info...', 'close');
			}
		})
		this.mibService.dataChanged$.subscribe(()=>{
			this.cage = this.mibService.cage;
			this.groups = this.mibService.groups;
			this.modules = this.mibService.modules;
			this.power = this.mibService.power;
			this.network = this.mibService.network;
			this.events = this.mibService.events;
		})
		this.mibService.collectData();
	}

	downloadHelp(){
		window.open('/assets/rfof-webapp-help.pdf', '_blank');
	}

	setPreference(){
		this.cage.settings.userConfig = ConfigOption.save;
		this.mibService.updateCageSettings(this.cage.settings).subscribe(result=>{
			let message = 'Failed to set cage preferences';
			if(result && result.length > 0){
				message = 'succsessfully set cage preferences';
			}
			this.snackBar.open(message, 'Close',{
				duration: 10000
			})
		})
	}
}
