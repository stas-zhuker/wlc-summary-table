import { Component, HostBinding, HostListener, OnInit, ViewChild } from '@angular/core';

import _reduce from 'lodash-es/reduce';
import _forEach from 'lodash-es/forEach';
import { Table } from 'primeng/table';

import {
    ICustomTableState,
    IProjectVersions,
    IVersionsEnvColumn,
    TTableStateType,
} from 'src/modules/wlc-table/system/interfaces/project.interface';
import { ProjectService } from 'src/modules/wlc-table/system/services/projects.service';
import { TableState } from 'primeng/api/tablestate';

@Component({
    selector: 'app-wlc-table',
    templateUrl: './wlc-table.component.html',
    styleUrls: ['./wlc-table.component.scss'],
})
export class WlcTableComponent implements OnInit {
    @HostBinding('class') public $hostClass = 'wlc-table';

    @ViewChild('dt') public dt: Table;

    /**
     * Fields to which the global filter will be applied
     */
    public globalFilterFields = [
        'title',
        'qa.engine',
        'qa.theme',
        'qa.core',
        'qa.php',
        'test.engine',
        'test.theme',
        'test.core',
        'test.php',
        'prod.preprod_engine',
        'prod.preprod_theme',
        'prod.preprod_core',
        'prod.engine',
        'prod.theme',
        'prod.core',
        'prod.php',
    ];

    /**
     * width of the table cell
     */
    public defColWidth = 110;

    /**
     * projects versions list
     */
    public projectsVersions: IProjectVersions[] = [];

    /**
     * list of columns to enable and disable the display of columns
     */
    public cols: IVersionsEnvColumn[] = [];

    /**
     * selected rows
     */
    public _selectedRows: IProjectVersions[];

    /**
     * screen height to use scrollbar
     */
    public screenHeight: string;

    /**
     * show only selected rows
     */
    public showSelectedRowsOnly: boolean;

    /**
     * Set of selected rows title
     */
    private _selectedRowsTitlesSet: Set<string> = new Set();

    /**
     * selected columns to display
     */
    private _selectedColumns: IVersionsEnvColumn[];

    constructor(private projectService: ProjectService) {
        this._selectedColumns = this.getTableStateFromLocalStorage('custom-table-state').selectedColumns || [];
    }

    public async ngOnInit(): Promise<void> {
        await this.projectService.ready;
        this.projectsVersions = this.projectService.projects;
        this.screenHeight = window.innerHeight + 'px';

        this.cols = [
            { env: 'qa', elems: 4, header: 'Versions QA' },
            { env: 'test', elems: 4, header: 'Versions TEST' },
            { env: 'preprod', elems: 3, header: 'Versions PREPROD' },
            { env: 'prod', elems: 4, header: 'Versions PROD' },
        ];

        if (!this.selectedColumns.length) {
            this.selectedColumns = this.cols;
        }

        this.showSelectedRowsOnly = this.getTableStateFromLocalStorage('custom-table-state').showSelectedRowsOnly;
    }

    /**
     * get selected columns to display
     */
    public get selectedColumns(): IVersionsEnvColumn[] {
        return this._selectedColumns;
    }

    /**
     * set selected columns to display and writing them to the localStorage
     */
    public set selectedColumns(selectedCols: IVersionsEnvColumn[]) {
        const customTableState = this.getTableStateFromLocalStorage('custom-table-state');
        // restore original order (from primeNG doc: https://www.primefaces.org/primeng/#/table/coltoggle)
        this._selectedColumns = this.cols.filter((col) => selectedCols.includes(col));

        customTableState.selectedColumns = this.selectedColumns;
        this.setNewTableStateToLocalStorage(customTableState, 'custom-table-state');
    }

    /**
     * get selected rows
     */
    public get selectedRows() {
        return this._selectedRows;
    }

    /**
     * set selected rows and update select rows title set
     */
    public set selectedRows(rows: IProjectVersions[]) {
        this.updateSelectRowsTitleSet(rows);
        this._selectedRows = rows;
    }

    /**
     * get selected rows title set
     */
    public get selectedRowsTitlesSet(): Set<string> {
        return this._selectedRowsTitlesSet;
    }

    /**
     * get global filter from local storage
     */
    public get globalFilterFromStorage(): string {
        return this.getTableStateFromLocalStorage('table-state').filters?.global?.value || '';
    }

    /**
     * change checkbox showSelectedRowsOnly
     */
    public showSelectedRowsChange() {
        const customTableState = this.getTableStateFromLocalStorage('custom-table-state');
        customTableState.showSelectedRowsOnly = this.showSelectedRowsOnly;
        this.setNewTableStateToLocalStorage(customTableState, 'custom-table-state');
    }

    /**
     * Remove table states from localStorage and reload page
     */
    public clearTableStates(): void {
        localStorage.removeItem('table-state');
        localStorage.removeItem('custom-table-state');
        location.reload();
    }

    /**
     * Apply global filter
     *
     * @param {Event} $event
     * @param {string} stringVal
     */
    public applyFilterGlobal($event: Event, stringVal: string): void {
        this.dt.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
    }

    /**
     * Clear selected rows and remove it from localStorage
     */
    public clearSelectedRows(): void {
        const tableState = this.getTableStateFromLocalStorage('table-state');
        delete tableState.selection;

        this.setNewTableStateToLocalStorage(tableState, 'table-state');
        this.selectedRows = [];
        this.updateSelectRowsTitleSet([]);
    }

    /**
     * Get varsions cell width
     *
     * @returns {number} cell width in px
     */
    public versionsCellWidth(): number {
        return _reduce(
            this.selectedColumns,
            (result, col) => {
                return result + col.elems * this.defColWidth;
            },
            0
        );
    }

    /**
     * Window resize handler
     */
    @HostListener('window:resize')
    public onResize(): void {
        this.screenHeight = window.innerHeight + 'px';
    }

    /**
     * Update select rows title set
     *
     * @param {IProjectVersions[]} selectedRows
     */
    private updateSelectRowsTitleSet(selectedRows: IProjectVersions[]) {
        this._selectedRowsTitlesSet.clear();
        _forEach(selectedRows, (project) => this._selectedRowsTitlesSet.add(project.title));
    }

    /**
     * Get table state from local storage
     */
    private getTableStateFromLocalStorage(tableStateType: TTableStateType) {
        return JSON.parse(localStorage.getItem(tableStateType)) || {};
    }

    /**
     * Set new table state to local storage
     *
     * @param {TableState | ICustomTableState} tableState table storage object
     * @param {TTableStateType} tableStateType table storage object
     */
    private setNewTableStateToLocalStorage(
        tableState: TableState | ICustomTableState,
        tableStateType: TTableStateType
    ) {
        localStorage.setItem(tableStateType, JSON.stringify(tableState));
    }
}
