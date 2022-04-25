import { Injectable } from '@angular/core';
import { TTableFrom } from 'src/modules/core/systems/interfaces';
import { IAppTablesListItem } from 'src/modules/tables/systems/interfaces/app-tables-list/app-tables-list.intarface';

@Injectable({
    providedIn: 'root',
})
export class AppTablesListService {
    private _appTables: IAppTablesListItem[] = [];

    private readonly _tableFrom: TTableFrom = 'app';

    constructor() {
        this._appTables = [
            {
                tableName: 'Versions',
                tableFrom: this._tableFrom,
                tableLink: 'versions',
                linkOrder: 1,
            },
            {
                tableName: 'Domains',
                tableFrom: this._tableFrom,
                tableLink: 'domains',
                linkOrder: 3,
            },
        ];
    }

    public get appTables(): IAppTablesListItem[] {
        return this._appTables;
    }
}
