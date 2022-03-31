import { Component, HostBinding, HostListener, OnInit, ViewChild } from '@angular/core';

import _reduce from 'lodash-es/reduce';
import { Table } from 'primeng/table';

import { IProjectVersions, IVersionsEnvColumn } from 'src/modules/wlc-table/system/interfaces/project.interface';
import { ProjectService } from 'src/modules/wlc-table/system/services/projects.service';

@Component({
    selector: 'app-wlc-table',
    templateUrl: './wlc-table.component.html',
    styleUrls: ['./wlc-table.component.scss'],
})
export class WlcTableComponent implements OnInit {
    @HostBinding('class') public $hostClass = 'wlc-table';

    @ViewChild('dt') public dt: Table;

    // fields to which the global filter will be applied
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

    // width of the table cell
    public defColWidth = 110;

    // projects versions list
    public projectsVersions: IProjectVersions[] = [];

    // list of columns to enable and disable the display of columns
    public cols: IVersionsEnvColumn[] = [];

    // selected rows
    public selectedRows: IProjectVersions[];

    // screen height to use scrollbar
    public screenHeight: string;

    // selected columns to display
    private _selectedColumns: IVersionsEnvColumn[];

    constructor(protected projectService: ProjectService) {
        this._selectedColumns = JSON.parse(localStorage.getItem('table-storage'))?.selectedColumns || [];
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
    }

    // get selected columns to display
    get selectedColumns(): IVersionsEnvColumn[] {
        return this._selectedColumns;
    }

    // set selected columns to display and writing them to the localStorage
    set selectedColumns(selectedCols: IVersionsEnvColumn[]) {
        // restore original order (from primeNG doc: https://www.primefaces.org/primeng/#/table/coltoggle)
        this._selectedColumns = this.cols.filter((col) => selectedCols.includes(col));

        const tableStorage = JSON.parse(localStorage.getItem('table-storage')) || {};
        tableStorage.selectedColumns = this.selectedColumns;
        localStorage.setItem('table-storage', JSON.stringify(tableStorage));
    }

    // get global filter from storage
    public get globalFilterFromStorage(): string {
        const tableStorage = JSON.parse(localStorage.getItem('table-storage'));

        return tableStorage?.filters?.global?.value || '';
    }

    /**
     * Remove table storage from localStorage
     */
    public clearTableStorage(): void {
        localStorage.removeItem('table-storage');
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
        const tableStorage = JSON.parse(localStorage.getItem('table-storage'));
        delete tableStorage.selection;

        localStorage.setItem('table-storage', JSON.stringify(tableStorage));
        this.selectedRows = [];
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

    @HostListener('window:resize')
    public onResize(): void {
        this.screenHeight = window.innerHeight + 'px';
    }
}
