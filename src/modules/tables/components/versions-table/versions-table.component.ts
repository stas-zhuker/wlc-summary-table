import { Component, HostBinding, OnInit } from '@angular/core';

import _reduce from 'lodash-es/reduce';

import {
    IProjectVersions,
    IVersionsEnvColumn,
    TDepType,
} from 'src/modules/tables/systems/interfaces/versions/versions.interface';
import { VersionsService } from 'src/modules/tables/systems/services';
import { BadReleasesSheetService } from 'src/modules/google-sheets/systems/servises';
import { LocalStorageService } from 'src/modules/core/systems/services';
import { AbstractTableComponent } from '../../systems/classes/abstract-table.component';

@Component({
    selector: 'app-versions-table',
    templateUrl: './versions-table.component.html',
    styleUrls: ['./versions-table.component.scss'],
})
export class VersionsTableComponent extends AbstractTableComponent implements OnInit {
    @HostBinding('class') public $hostClass = 'versions-table';

    public readonly tableState = 'versions';

    public readonly tableName = 'Versions';

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

    public cols: IVersionsEnvColumn[] = [
        { env: 'qa', elems: 4, header: 'Versions QA' },
        { env: 'test', elems: 4, header: 'Versions TEST' },
        { env: 'preprod', elems: 3, header: 'Versions PREPROD' },
        { env: 'prod', elems: 4, header: 'Versions PROD' },
    ];

    /**
     * projects versions list
     */
    public projectsVersions: IProjectVersions[] = [];

    public defColWidth = 110;

    protected _selectedColumns: IVersionsEnvColumn[];

    protected _selectedRows: IProjectVersions;

    constructor(
        private versionsService: VersionsService,
        private badReleasesSheetService: BadReleasesSheetService,
        protected localStorageService: LocalStorageService
    ) {
        super(localStorageService);
    }

    public get tableNameCellWidth(): number {
        return _reduce(
            this.selectedColumns,
            (result, col) => {
                return result + col.elems * this.defColWidth;
            },
            0
        );
    }

    public async ngOnInit(): Promise<void> {
        super.ngOnInit();
        await this.versionsService.ready;
        await this.badReleasesSheetService.ready;

        this.projectsVersions = this.versionsService.projects;
    }

    /**
     * Get tooltip from bad releases table
     *
     * @param {TDepType} dep
     * @param {string} version
     *
     * @returns {string}
     */
    public getTooltip(dep: TDepType, version: string): string {
        return this.badReleasesSheetService.badReleases[dep][version] || '';
    }
}
