import { Injectable } from '@angular/core';
import { TableState } from 'primeng/api/tablestate';
import { ICustomTableState, TTableStateType } from 'src/modules/wlc-table/system/interfaces/project.interface';

@Injectable({
    providedIn: 'root',
})
export class LocalStorageService {
    // constructor() {}

    /**
     * Remove table states from localStorage and reload page
     */
    public clearTableStates(): void {
        localStorage.removeItem('table-state');
        localStorage.removeItem('custom-table-state');
        location.reload();
    }

    /**
     * Get table state from local storage
     */
    public getTableState(tableStateType: TTableStateType) {
        return JSON.parse(localStorage.getItem(tableStateType)) || {};
    }

    /**
     * Set new table state to local storage
     *
     * @param {TableState | ICustomTableState} tableState table storage object
     * @param {TTableStateType} tableStateType table storage object
     */
    public setNewTableState(tableState: TableState | ICustomTableState, tableStateType: TTableStateType) {
        localStorage.setItem(tableStateType, JSON.stringify(tableState));
    }
}
