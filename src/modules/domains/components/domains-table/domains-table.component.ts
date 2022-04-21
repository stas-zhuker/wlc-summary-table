import { Component, HostBinding, HostListener, OnInit, ViewChild } from '@angular/core';

import { Table } from 'primeng/table';
import _forEach from 'lodash-es/forEach';
import _isArray from 'lodash-es/isArray';

import { LocalStorageService } from 'src/modules/core/systems/services/local-storage.service';
import { IDomainsColumn, IProjectDomains } from 'src/modules/domains/systems/interfaces/project-domains.interface';
import { DomainsService } from 'src/modules/domains/systems/services/domains.service';

@Component({
    selector: 'app-domains-table',
    templateUrl: './domains-table.component.html',
    styleUrls: ['./domains-table.component.scss'],
})
export class DomainsTableComponent implements OnInit {
    @HostBinding('class') public $hostClass = 'domains-table';

    @ViewChild('dt') public dt: Table;

    /**
     * Fields to which the global filter will be applied
     */
    public globalFilterFields: string[] = [
        'redmineProjectName',
        'prodLink',
        'affProdLink',
        'affBackoffice',
        'testLink',
        'affTestLink',
        'qaLink',
        'mirrors',
    ];

    /**
     * screen height to use scrollbar
     */
    public screenHeight: string;

    /**
     * show only selected rows
     */
    public showSelectedRowsOnly: boolean;

    /**
     * projects versions list
     */
    public projectsDomains: IProjectDomains[] = [];

    /**
     * list of columns to enable and disable the display of columns
     */
    public cols: IDomainsColumn[] = [
        'prodLink',
        'affProdLink',
        'affBackoffice',
        'testLink',
        'affTestLink',
        'qaLink',
        'mirrors',
    ];

    /**
     * width of the table cell
     */
    public defColWidth = 240;

    /**
     * table name for LocalStorageService
     */
    private readonly tableMame = 'domains';

    /**
     * selected columns to display
     */
    private _selectedColumns: IDomainsColumn[];

    /**
     * selected rows
     */
    private _selectedRows: IProjectDomains[];

    /**
     * Set of selected rows title
     */
    private _selectedRowsTitlesSet: Set<string> = new Set();

    constructor(private domainsService: DomainsService, private localStorageService: LocalStorageService) {
        this._selectedColumns = this.localStorageService.getTableState(this.tableMame, 'custom').selectedColumns || [];
    }

    /**
     * get selected columns to display
     */
    public get selectedColumns(): IDomainsColumn[] {
        return this._selectedColumns;
    }

    /**
     * set selected columns to display and writing them to the localStorage
     */
    public set selectedColumns(selectedCols: IDomainsColumn[]) {
        const customTableState = this.localStorageService.getTableState(this.tableMame, 'custom');
        // restore original order (from primeNG doc: https://www.primefaces.org/primeng/#/table/coltoggle)
        this._selectedColumns = this.cols.filter((col) => selectedCols.includes(col));

        customTableState.selectedColumns = this.selectedColumns;
        this.localStorageService.setNewTableState(customTableState, this.tableMame, 'custom');
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
    public set selectedRows(rows: IProjectDomains[]) {
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
        return this.localStorageService.getTableState(this.tableMame, 'primeNG').filters?.global?.value || '';
    }

    /**
     * Get domains cell width
     *
     * @returns {number} cell width in px
     */
    public get domainsCellWidth(): number {
        return this.selectedColumns.length * this.defColWidth;
        // return _reduce(
        //     this.selectedColumns,
        //     (result, col) => {
        //         return result + this.defColWidth;
        //     },
        //     0
        // );
    }

    public async ngOnInit(): Promise<void> {
        await this.domainsService.ready;

        this.projectsDomains = this.domainsService.domains;
        this.screenHeight = window.innerHeight + 'px';

        if (!this.selectedColumns.length) {
            this.selectedColumns = this.cols;
        }

        this.showSelectedRowsOnly = this.localStorageService.getTableState(
            this.tableMame,
            'custom'
        ).showSelectedRowsOnly;
    }

    /**
     * change checkbox showSelectedRowsOnly
     */
    public showSelectedRowsChange() {
        const customTableState = this.localStorageService.getTableState(this.tableMame, 'custom');
        customTableState.showSelectedRowsOnly = this.showSelectedRowsOnly;
        this.localStorageService.setNewTableState(customTableState, this.tableMame, 'custom');
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
        const tableState = this.localStorageService.getTableState(this.tableMame, 'primeNG');
        delete tableState.selection;

        this.localStorageService.setNewTableState(tableState, this.tableMame, 'primeNG');
        this.selectedRows = [];
        this.updateSelectRowsTitleSet([]);
    }

    /**
     * Remove table states from localStorage and reload page
     */
    public clearTableStates(): void {
        this.localStorageService.clearTableStates(this.tableMame);
    }

    public isArray(value: string | string[]): boolean {
        return _isArray(value);
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
    private updateSelectRowsTitleSet(selectedRows: IProjectDomains[]) {
        this._selectedRowsTitlesSet.clear();
        _forEach(selectedRows, (project) => this._selectedRowsTitlesSet.add(project.redmineProjectName));
    }
}
