import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { TooltipModule } from 'primeng/tooltip';

import { ProjectService } from 'src/modules/wlc-table/system/services/projects.service';
import { WlcTableComponent } from 'src/modules/wlc-table/components/wlc-table/wlc-table.component';
import { VersionsSelectorComponent } from 'src/modules/wlc-table/components/versions-selector/versions-selector.component';

@NgModule({
    declarations: [WlcTableComponent, VersionsSelectorComponent],
    imports: [
        CommonModule,
        FormsModule,
        TableModule,
        InputTextModule,
        MultiSelectModule,
        BrowserAnimationsModule,
        ButtonModule,
        CheckboxModule,
        TooltipModule,
    ],
    exports: [WlcTableComponent],
    providers: [ProjectService],
})
export class WlcTableModule {}
