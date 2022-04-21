import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DomainsModule } from 'src/modules/domains/domains.module';
import { VersionsModule } from 'src/modules/versions/versions.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule, AppRoutingModule, VersionsModule, DomainsModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
