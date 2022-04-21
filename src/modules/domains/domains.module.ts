import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TableModule } from 'primeng/table';

import { DomainsTableComponent } from 'src/modules/domains/components/domains-table/domains-table.component';
import { DomainsService } from 'src/modules/domains/systems/services/domains.service';
import { MultiSelectModule } from 'primeng/multiselect';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';

@NgModule({
    declarations: [DomainsTableComponent],
    imports: [CommonModule, FormsModule, TableModule, MultiSelectModule, ButtonModule, CheckboxModule, InputTextModule],
    exports: [DomainsTableComponent],
    providers: [DomainsService],
})
export class DomainsModule {}
