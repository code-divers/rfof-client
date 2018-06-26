import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatExpansionModule } from '@angular/material/expansion';

import { AppComponent } from './app.component';
import { CageInfoComponent } from './cage-info/cage-info.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CageGroupsComponent } from './cage-groups/cage-groups.component';
import { CageGroupComponent } from './cage-group/cage-group.component';
import { CageModuleLineComponent } from './cage-module-line/cage-module-line.component';

@NgModule({
  declarations: [
    AppComponent,
    CageInfoComponent,
    NavbarComponent,
    CageGroupsComponent,
    CageGroupComponent,
    CageModuleLineComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatGridListModule,
    MatListModule,
    MatButtonModule,
    MatSidenavModule,
    MatExpansionModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
