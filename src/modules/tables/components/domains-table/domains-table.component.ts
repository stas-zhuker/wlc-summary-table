import { Component, HostBinding, OnInit } from '@angular/core';

import _isArray from 'lodash-es/isArray';

import { LocalStorageService } from 'src/modules/core/systems/services';
import {
    IDomainsColumn,
    IProjectDomains,
} from 'src/modules/tables/systems/interfaces/domains/project-domains.interface';
import { DomainsService } from 'src/modules/tables/systems/services/domains/domains.service';
import { AbstractTableComponent } from 'src/modules/tables/systems/classes';

@Component({
    selector: 'app-domains-table',
    templateUrl: './domains-table.component.html',
    styleUrls: ['./domains-table.component.scss'],
})
export class DomainsTableComponent extends AbstractTableComponent implements OnInit {
    @HostBinding('class') public $hostClass = 'domains-table';

    public readonly tableName = 'Domains';

    public readonly tableState = 'domains';

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
     * projects domains list
     */
    public projectsDomains: IProjectDomains[] = [];

    public defColWidth = 240;

    protected _selectedColumns: IDomainsColumn[];

    protected _selectedRows: IProjectDomains;

    constructor(private domainsService: DomainsService, protected localStorageService: LocalStorageService) {
        super(localStorageService);
    }

    public async ngOnInit(): Promise<void> {
        super.ngOnInit();
        await this.domainsService.ready;

        this.projectsDomains = this.domainsService.domains;
    }

    public isArray(value: string | string[]): boolean {
        return _isArray(value);
    }
}
