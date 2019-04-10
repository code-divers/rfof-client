import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { first} from 'rxjs/operators';
import { MIBService } from '../mib.service';
import { CageGroup, CageModule, GroupType,  SlotStatus} from 'rfof-common';
import { ModuleManagerService, SelectedModule } from '../module-manager.service';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { Observable, of } from 'rxjs';


/** Flat to-do item node with expandable and level information */
export class GroupItemFlatNode {
  item: string;
  level: number;
  expandable: boolean;
}

@Component({
  selector: 'rfof-cage-groups',
  templateUrl: './cage-groups.component.html',
  styleUrls: ['./cage-groups.component.scss']
})
export class CageGroupsComponent implements OnInit {
	@Input() groups: CageGroup[];
	@ViewChild('tree') tree;
	selectedModules: SelectedModule[] = [];

	treeControl: FlatTreeControl<GroupItemFlatNode>;
	treeFlattener: MatTreeFlattener<CageGroup, GroupItemFlatNode>;
	dataSource: MatTreeFlatDataSource<CageGroup, GroupItemFlatNode>;
	
	constructor(private mibService: MIBService, private moduleManagerService: ModuleManagerService) {
		this.treeFlattener = new MatTreeFlattener(this.transformer, this._getLevel, this._isExpandable, this._getChildren);
		this.treeControl = new FlatTreeControl<GroupItemFlatNode>(this._getLevel, this._isExpandable);
		this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
	}

	transformer = (node: CageGroup, level: number) => {
		let flatItem = new GroupItemFlatNode();
		flatItem.expandable = node.modules ? node.modules.length > 0 : false;
		flatItem.item = node;
		flatItem.level = level;
		return flatItem;
	}


	private _getLevel = (node: GroupItemFlatNode) => node.level;

  	private _isExpandable = (node: GroupItemFlatNode) => node.expandable;

  	private _getChildren = (node: CageGroup): Observable<CageModule[]> => of(node.modules.filter((module)=>{return module.slotStatus == SlotStatus.in}));

	ngOnInit() {
		this.dataSource.data = this.groups;
  		
  		this.mibService.slotStateChanged$.subscribe(module=>{
			for(let group of this.groups){
				let idx = group.modules.findIndex((item)=>{
					return item.slot == module.slot;
				});
				if(idx > -1){
					group.modules[idx] = module;
				}
			}
			this.dataSource.data = this.groups;
			this.tree.treeControl.expandAll();
			
		})


  		this.moduleManagerService.moduleSelected$.subscribe(selected=>{
			this.selectedModules = selected;
		});
		this.groups.map((group)=>{
			this.selectAll(group);
		})
	}

	ngAfterViewInit() {
	  this.tree.treeControl.expandAll();
	}

	hasChild = (_: number, _nodeData: GroupItemFlatNode) => _nodeData.expandable;

	getGroupModules(group: CageGroup){
		return this.mibService.getCageGroupModules(group);
	}


	selectAll(group: CageGroup){
		//let modules = this.mibService.getCageGroupModules(group);
		for(var module of group.modules){
			this.moduleManagerService.selectModule({
				module: module,
				isOpen: false
			});
		}
	}

	closeAll(group: CageGroup){
		//let modules = this.mibService.getCageGroupModules(group);
		for(var module of group.modules){
			this.moduleManagerService.deselectModule({
				module: module,
				isOpen: false
			});
		}
	}

	isSelected(group: CageGroup){
		return this.selectedModules.find((option)=>{
			return option.module.group.name == group.name;
		}) != null;
	}

}
