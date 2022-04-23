import { Component, HostBinding, OnInit } from '@angular/core';

import { ITablesListItem } from 'src/modules/core/systems/interfaces/tables-list/tables-list.interface';
import { TablesListService } from 'src/modules/core/systems/services/tables-list/tables-list.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
    @HostBinding('class') public $hostClass = 'header';

    /**
     * Array of all header links datas
     */
    public linksList: ITablesListItem[] = [];

    constructor(private tablesListService: TablesListService) {}

    public ngOnInit(): void {
        this.linksList = [...this.tablesListService.tables];
    }
}
