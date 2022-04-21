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

import { ProjectService } from 'src/modules/versions/system/services/projects.service';
import { VersionsTableComponent } from 'src/modules/versions/components/versions-table/versions-table.component';
import { VersionsSelectorComponent } from 'src/modules/versions/components/versions-selector/versions-selector.component';

@NgModule({
    declarations: [VersionsTableComponent, VersionsSelectorComponent],
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
    exports: [VersionsTableComponent],
    providers: [ProjectService],
})
export class VersionsModule {}
