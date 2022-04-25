import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DomainsTableComponent } from 'src/modules/tables/components/domains-table/domains-table.component';
import { VersionsTableComponent } from 'src/modules/tables/components/versions-table/versions-table.component';

const routes: Routes = [
    { path: 'versions', component: VersionsTableComponent },
    { path: 'domains', component: DomainsTableComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
