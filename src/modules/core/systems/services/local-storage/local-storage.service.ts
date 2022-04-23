import { Injectable } from '@angular/core';

import { TableState } from 'primeng/api/tablestate';

import { ICustomTableState, TTableStateType, TAppTableState } from 'src/modules/tables/systems/interfaces';

@Injectable({
    providedIn: 'root',
})
export class LocalStorageService {
    /**
     * Remove table states from localStorage and reload page
     *
     * @param {TAppTableState} tableName name of table state
     *
     * @returns {void}
     */
    public clearTableStates(tableName: TAppTableState): void {
        localStorage.removeItem(`${tableName}-primeNG-state`);
        localStorage.removeItem(`${tableName}-custom-state`);
        location.reload();
    }

    /**
     * Get table state from local storage
     *
     * @param {TAppTableState} tableName name of table state
     * @param {tableStateType} tableStateType type of table state
     *
     * @returns {TableState | ICustomTableState} table state
     */
    public getTableState(tableName: TAppTableState, tableStateType: TTableStateType) {
        return JSON.parse(localStorage.getItem(tableName + '-' + tableStateType + '-state')) || {};
    }

    /**
     * Set new table state to local storage
     *
     * @param {TableState | ICustomTableState} tableState table storage object
     * @param {TAppTableState} tableName name of table state
     * @param {tableStateType} tableStateType type of table state
     *
     * @returns {void}
     */
    public setNewTableState(
        tableState: TableState | ICustomTableState,
        tableName: TAppTableState,
        tableStateType: TTableStateType
    ): void {
        localStorage.setItem(tableName + '-' + tableStateType + '-state', JSON.stringify(tableState));
    }
}
