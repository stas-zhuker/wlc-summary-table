import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { ToastModule } from 'primeng/toast';

import { WlcTableComponent } from './components/wlc-table/wlc-table.component';
import { ProjectService } from 'src/modules/wlc-table/system/services/projects.service';
import { ButtonModule } from 'primeng/button';
import { VersionsSelectorComponent } from './components/versions-selector/versions-selector.component';

@NgModule({
    declarations: [WlcTableComponent, VersionsSelectorComponent],
    imports: [
        CommonModule,
        TableModule,
        InputTextModule,
        MultiSelectModule,
        FormsModule,
        BrowserAnimationsModule,
        ToastModule,
        ButtonModule,
    ],
    exports: [WlcTableComponent],
    providers: [ProjectService],
})
export class WlcTableModule {}
