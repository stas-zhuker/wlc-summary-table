import { Injectable } from '@angular/core';

import _sortBy from 'lodash-es/sortBy';

import { GoogleTablesListService } from 'src/modules/google-sheets/systems/servises';
import { AppTablesListService } from 'src/modules/tables/systems/services';
import { ITablesListItem } from 'src/modules/core/systems/interfaces/tables-list/tables-list.interface';

@Injectable({
    providedIn: 'root',
})
export class TablesListService {
    /**
     * Array of tables
     */
    private _tables: ITablesListItem[] = [];

    constructor(
        private appTablesListService: AppTablesListService,
        private googleTablesListService: GoogleTablesListService
    ) {
        this._tables = _sortBy(
            [...this.appTablesListService.appTables, ...this.googleTablesListService.googleTables],
            ['linkOrder']
        );
    }

    /**
     * Array of tables
     *
     * @returns {ITablesListItem[]}
     */
    public get tables(): ITablesListItem[] {
        return this._tables;
    }
}
