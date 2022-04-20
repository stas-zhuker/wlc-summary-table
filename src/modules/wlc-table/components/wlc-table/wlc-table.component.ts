import { Component, HostBinding, HostListener, OnInit, ViewChild } from '@angular/core';

import _reduce from 'lodash-es/reduce';
import _forEach from 'lodash-es/forEach';
import { Table } from 'primeng/table';

import {
    IProjectVersions,
    IVersionsEnvColumn,
    TDepType,
} from 'src/modules/wlc-table/system/interfaces/project.interface';
import { ProjectService } from 'src/modules/wlc-table/system/services/projects.service';
import { LocalStorageService } from 'src/modules/wlc-table/system/services/local-storage.service';
import { BadReleasesSheetService } from 'src/modules/google-sheets/systems/servises/bad-releases-sheet.service';

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
    public globalFilterFields: string[] = [
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
    public cols: IVersionsEnvColumn[] = [
        { env: 'qa', elems: 4, header: 'Versions QA' },
        { env: 'test', elems: 4, header: 'Versions TEST' },
        { env: 'preprod', elems: 3, header: 'Versions PREPROD' },
        { env: 'prod', elems: 4, header: 'Versions PROD' },
    ];

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

    constructor(
        private projectService: ProjectService,
        private localStorageService: LocalStorageService,
        private badReleasesSheetService: BadReleasesSheetService
    ) {
        this._selectedColumns = this.localStorageService.getTableState('custom-table-state').selectedColumns || [];
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
        const customTableState = this.localStorageService.getTableState('custom-table-state');
        // restore original order (from primeNG doc: https://www.primefaces.org/primeng/#/table/coltoggle)
        this._selectedColumns = this.cols.filter((col) => selectedCols.includes(col));

        customTableState.selectedColumns = this.selectedColumns;
        this.localStorageService.setNewTableState(customTableState, 'custom-table-state');
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
        return this.localStorageService.getTableState('table-state').filters?.global?.value || '';
    }

    public async ngOnInit(): Promise<void> {
        await this.projectService.ready;
        await this.badReleasesSheetService.ready;

        this.projectsVersions = this.projectService.projects;
        this.screenHeight = window.innerHeight + 'px';

        if (!this.selectedColumns.length) {
            this.selectedColumns = this.cols;
        }

        this.showSelectedRowsOnly = this.localStorageService.getTableState('custom-table-state').showSelectedRowsOnly;
    }

    /**
     * change checkbox showSelectedRowsOnly
     */
    public showSelectedRowsChange() {
        const customTableState = this.localStorageService.getTableState('custom-table-state');
        customTableState.showSelectedRowsOnly = this.showSelectedRowsOnly;
        this.localStorageService.setNewTableState(customTableState, 'custom-table-state');
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
        const tableState = this.localStorageService.getTableState('table-state');
        delete tableState.selection;

        this.localStorageService.setNewTableState(tableState, 'table-state');
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
     * Remove table states from localStorage and reload page
     */
    public clearTableStates(): void {
        this.localStorageService.clearTableStates();
    }

    /**
     * Get tooltip from bad releases table
     */
    public getTooltip(dep: TDepType, version: string) {
        return this.badReleasesSheetService.badReleases[dep][version] || '';
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
}
