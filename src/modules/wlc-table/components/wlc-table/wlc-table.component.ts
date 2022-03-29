import { Component, HostBinding, HostListener, Input, OnInit, ViewChild } from '@angular/core';

import _reduce from 'lodash-es/reduce';
import { Table } from 'primeng/table';

import { IProjectVersions } from 'src/modules/wlc-table/system/interfaces/project.interface';
import { ProjectService } from 'src/modules/wlc-table/system/services/projects.service';

@Component({
    selector: 'app-wlc-table',
    templateUrl: './wlc-table.component.html',
    styleUrls: ['./wlc-table.component.scss'],
})
export class WlcTableComponent implements OnInit {
    @HostBinding('class') public $hostClass = 'wlc-table';

    @ViewChild('dt') dt: Table;

    public defColWidth = 150;

    public projectsVersions: IProjectVersions[] = [];

    public phpVersions = ['7.2', '7.3', ''];

    public selectedRows: IProjectVersions[];

    public cols: any[] = [];

    _selectedColumns: any[];

    public screenHeight: string;

    constructor(protected projectService: ProjectService) {}

    public ngOnInit() {
        this.projectsVersions = this.projectService.projects;
        this.screenHeight = window.innerHeight + 'px';

        this.cols = [
            { env: 'qa', elems: 4, header: 'QA' },
            { env: 'test', elems: 4, header: 'TEST' },
            { env: 'preprod', elems: 3,  header: 'PREPROD' },
            { env: 'prod', elems: 4, header: 'PROD' },
        ];

        this._selectedColumns = this.cols;
    }

    @Input() get selectedColumns(): any[] {
        return this._selectedColumns;
    }

    set selectedColumns(val: any[]) {
        //restore original order
        this._selectedColumns = this.cols.filter(col => val.includes(col));
    }

    public applyFilterGlobal($event, stringVal) {
        this.dt.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
    }

    public clearSelectedRows(): void {
        this.selectedRows = [];
    }

    public versionsCellWith(): number {
        return _reduce(this.selectedColumns, (result, col) => {
            return result + col.elems * 150;
        }, 0); 
    }

    @HostListener('window:resize')
    public onResize(): void {
        this.screenHeight = window.innerHeight + 'px';
    }
}
