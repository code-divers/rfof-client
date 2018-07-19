import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatRadioModule } from '@angular/material/radio';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { OverlayModule } from '@angular/cdk/overlay';

import { AppComponent } from './app.component';
import { CageInfoComponent } from './cage-info/cage-info.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CageGroupsComponent } from './cage-groups/cage-groups.component';
import { CageGroupComponent } from './cage-group/cage-group.component';
import { CageToolbarComponent } from './cage-toolbar/cage-toolbar.component';
import { CageEventlogComponent } from './cage-eventlog/cage-eventlog.component';
import { EventLevelComponent } from './event-level/event-level.component';
import { GroupSwitchComponent } from './group-switch/group-switch.component';
import { ModuleVisualComponent } from './module-visual/module-visual.component';
import { CageVisualComponent } from './cage-visual/cage-visual.component';
import { ModulePopupComponent } from './module-popup/module-popup.component';
import { ClickOutsideDirective } from './click-outside.directive';
import { CagePowerComponent } from './cage-power/cage-power.component';
import { CageStatusComponent } from './cage-status/cage-status.component';
import { CagePwrComComponent } from './cage-pwr-com/cage-pwr-com.component';
import { ModuleConfigDialogComponent } from './module-config-dialog/module-config-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    CageInfoComponent,
    NavbarComponent,
    CageGroupsComponent,
    CageGroupComponent,
    CageToolbarComponent,
    CageEventlogComponent,
    EventLevelComponent,
    GroupSwitchComponent,
    ModuleVisualComponent,
    CageVisualComponent,
    ModulePopupComponent,
    ClickOutsideDirective,
    CagePowerComponent,
    CageStatusComponent,
    CagePwrComComponent,
    ModuleConfigDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatGridListModule,
    MatListModule,
    MatButtonModule,
    MatSidenavModule,
    MatExpansionModule,
    MatRadioModule,
    MatToolbarModule,
    MatTabsModule,
    MatTableModule,
    MatDividerModule,
    MatCardModule,
    MatTooltipModule,
    MatPaginatorModule,
    MatSortModule,
    MatSelectModule,
    MatDialogModule,
    FormsModule,
    OverlayModule
  ],
  entryComponents: [ModulePopupComponent,ModuleConfigDialogComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
