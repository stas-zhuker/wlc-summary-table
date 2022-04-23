import { Injectable } from '@angular/core';

import { ITablesListItem, TTableFrom } from 'src/modules/core/systems/interfaces';

@Injectable({
    providedIn: 'root',
})
export class GoogleTablesListService {
    private _googleTables: ITablesListItem[] = [];

    private readonly _tableFrom: TTableFrom = 'google';

    constructor() {
        this._googleTables = [
            {
                tableName: 'Bad Releases',
                tableFrom: this._tableFrom,
                tableLink: 'https://docs.google.com/spreadsheets/d/1GDILOE8FpyPRcMV41L_nQzOkHOCb5gwL_C12JlT48gI',
                linkTarget: '_blank',
                linkOrder: 2,
            },
        ];
    }

    public get googleTables(): ITablesListItem[] {
        return this._googleTables;
    }
}
