import { Directive, HostListener, OnInit, ViewChild } from '@angular/core';

import { Table } from 'primeng/table';
import _forEach from 'lodash-es/forEach';
import _isEqual from 'lodash-es/isEqual';
import _findIndex from 'lodash-es/findIndex';
import _filter from 'lodash-es/filter';

import { LocalStorageService } from 'src/modules/core/systems/services';
import {
    TAppTableName,
    TAppTableState,
} from 'src/modules/tables/systems/interfaces/app-tables-list/app-tables-list.intarface';

@Directive()
export class AbstractTableComponent implements OnInit {
    @ViewChild('dt') public dt: Table;

    public readonly tableName: TAppTableName;

    /**
     * screen height to use scrollbar
     */
    public screenHeight: string;

    /**
     * Fields to which the global filter will be applied
     */
    public globalFilterFields: string[];

    /**
     * List of columns to enable and disable the display of columns
     * Use array of objects to make the search in p-multiSelect work. Example:
     * 'src/modules/tables/components/domains-table'
     */
    public cols: Object[];

    /**
     * show only selected rows
     */
    public showSelectedRowsOnly: boolean;

    /**
     * width of the table cell
     */
    public defColWidth: number;

    /**
     * table name for LocalStorageService
     */
    protected readonly tableState: TAppTableState;

    /**
     * selected columns to display
     */
    protected _selectedColumns;

    /**
     * selected rows
     */
    protected _selectedRows;

    /**
     * Set of selected rows title
     */
    protected _selectedRowsTitlesSet: Set<string> = new Set();

    constructor(protected localStorageService: LocalStorageService) {}

    public get tableNameCellWidth(): number {
        return this.selectedColumns.length * this.defColWidth;
    }

    public get selectedColumns() {
        return this._selectedColumns;
    }

    public set selectedColumns(selectedCols) {
        const customTableState = this.localStorageService.getTableState(this.tableState, 'custom');
        //restore original order
        this._selectedColumns = _filter(this.cols, (col) => {
            return _findIndex(selectedCols, (selectedCol) => _isEqual(col, selectedCol)) !== -1;
        });

        customTableState.selectedColumns = this.selectedColumns;

        this.localStorageService.setNewTableState(customTableState, this.tableState, 'custom');
    }

    public get selectedRows() {
        return this._selectedRows;
    }

    public set selectedRows(rows) {
        this.updateSelectRowsTitleSet(rows);
        this._selectedRows = rows;
    }

    public get selectedRowsTitlesSet(): Set<string> {
        return this._selectedRowsTitlesSet;
    }

    public get globalFilterFromStorage(): string {
        return this.localStorageService.getTableState(this.tableState, 'primeNG').filters?.global?.value || '';
    }

    public ngOnInit(): void {
        this._selectedColumns = this.localStorageService.getTableState(this.tableState, 'custom').selectedColumns || [];
        this.screenHeight = window.innerHeight - 50 + 'px';

        if (!this.selectedColumns.length) {
            this.selectedColumns = this.cols;
        }

        this.showSelectedRowsOnly = this.localStorageService.getTableState(
            this.tableState,
            'custom'
        ).showSelectedRowsOnly;
    }

    /**
     * change checkbox showSelectedRowsOnly
     *
     * @returns {void}
     */
    public showSelectedRowsChange(): void {
        const customTableState = this.localStorageService.getTableState(this.tableState, 'custom');
        customTableState.showSelectedRowsOnly = this.showSelectedRowsOnly;
        this.localStorageService.setNewTableState(customTableState, this.tableState, 'custom');
    }

    /**
     * Apply global filter
     *
     * @param {Event} $event
     * @param {string} stringVal
     *
     * @returns {void}
     */
    public applyFilterGlobal($event: Event, stringVal: string): void {
        this.dt.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
    }

    /**
     * Clear selected rows and remove it from localStorage
     *
     * @returns {void}
     */
    public clearSelectedRows(): void {
        const tableState = this.localStorageService.getTableState(this.tableState, 'primeNG');
        delete tableState.selection;

        this.localStorageService.setNewTableState(tableState, this.tableState, 'primeNG');
        this.selectedRows = [];
        this.updateSelectRowsTitleSet([]);
    }

    /**
     * Remove table states from localStorage and reload page
     *
     * @returns {void}
     */
    public clearTableStates(): void {
        this.localStorageService.clearTableStates(this.tableState);
    }

    /**
     * Window resize handler
     *
     * @returns {void}
     */
    @HostListener('window:resize')
    public onResize(): void {
        this.screenHeight = window.innerHeight - 50 + 'px';
    }

    /**
     * Update select rows title set
     *
     * @param selectedRows
     *
     * @returns {void}
     */
    protected updateSelectRowsTitleSet(selectedRows): void {
        this._selectedRowsTitlesSet.clear();
        // name of title field
        const titleName = this.tableState === 'domains' ? 'redmineProjectName' : 'title';
        _forEach(selectedRows, (project) => this._selectedRowsTitlesSet.add(project[titleName]));
    }
}
