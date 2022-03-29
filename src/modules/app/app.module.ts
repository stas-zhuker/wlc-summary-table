import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { WlcTableModule } from 'src/modules/wlc-table/wlc-table.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
	declarations: [AppComponent],
	imports: [BrowserModule, AppRoutingModule, WlcTableModule],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
