import { Injectable } from '@angular/core';
import { TableState } from 'primeng/api/tablestate';
import { TTable } from 'src/modules/core/systems/interfaces/global.interface';
import { ICustomTableState, TTableStateType } from 'src/modules/versions/system/interfaces/project.interface';

@Injectable({
    providedIn: 'root',
})
export class LocalStorageService {
    // constructor() {}

    /**
     * Remove table states from localStorage and reload page
     */
    public clearTableStates(tableName: TTable): void {
        localStorage.removeItem(`${tableName}-primeNG-state`);
        localStorage.removeItem(`${tableName}-custom-state`);
        location.reload();
    }

    /**
     * Get table state from local storage
     */
    public getTableState(tableName: TTable, tableStateType: TTableStateType) {
        return JSON.parse(localStorage.getItem(tableName + '-' + tableStateType + '-state')) || {};
    }

    /**
     * Set new table state to local storage
     *
     * @param {TableState | ICustomTableState} tableState table storage object
     * @param {TTableStateType} tableStateType table storage object
     */
    public setNewTableState(
        tableState: TableState | ICustomTableState,
        tableName: TTable,
        tableStateType: TTableStateType
    ) {
        localStorage.setItem(tableName + '-' + tableStateType + '-state', JSON.stringify(tableState));
    }
}
