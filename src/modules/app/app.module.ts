import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { CoreModule } from 'src/modules/core/core.module';
import { TablesModule } from 'src/modules/tables/tables.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule, AppRoutingModule, TablesModule, CoreModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
