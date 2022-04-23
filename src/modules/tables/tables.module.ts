import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { TooltipModule } from 'primeng/tooltip';

import { DomainsTableComponent } from './components/domains-table/domains-table.component';
import { VersionsTableComponent } from './components/versions-table/versions-table.component';
import { VersionsSelectorComponent } from './components/versions-selector/versions-selector.component';

@NgModule({
    declarations: [DomainsTableComponent, VersionsTableComponent, VersionsSelectorComponent],
    imports: [
        CommonModule,
        FormsModule,
        BrowserAnimationsModule,
        TableModule,
        InputTextModule,
        MultiSelectModule,
        ButtonModule,
        CheckboxModule,
        TooltipModule,
    ],
})
export class TablesModule {}
