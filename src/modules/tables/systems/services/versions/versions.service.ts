import { Injectable } from '@angular/core';

import _forIn from 'lodash-es/forIn';
import _startsWith from 'lodash-es/startsWith';
import _has from 'lodash-es/has';
import _sortBy from 'lodash-es/sortBy';

import { IProjectVersions } from 'src/modules/tables/systems/interfaces/versions/versions.interface';

@Injectable({
    providedIn: 'root',
})
export class VersionsService {
    public ready: Promise<void> = new Promise((resolve: () => void): void => {
        this.$resolve = resolve;
    });

    private $resolve: () => void;

    private _projects: IProjectVersions[] = [];

    constructor() {
        this.fetchProjects();
    }

    public get projects(): IProjectVersions[] {
        return this._projects;
    }

    private async fetchProjects(): Promise<void> {
        const response = await fetch('https://keepalive.egamings.com/assets/wlc.json');
        const projects = await response.json();

        _forIn(projects, (projectVersions) => {
            this.engineBranchHandler(projectVersions);
            this.absencePreprodFieldsHandler(projectVersions);
            this._projects.push(projectVersions);
        });

        this._projects = _sortBy(this._projects, ['title']);

        this.$resolve();
    }

    /**
     * Change locked branch link in engine to string 'branch'
     *
     * @param {IProjectVersions} versions
     *
     * @returns {void}
     */
    private engineBranchHandler(versions: IProjectVersions): void {
        if (_startsWith(versions.qa.engine, 'git+ssh')) {
            versions.qa.engine = 'branch';
        }

        if (_startsWith(versions.test.engine, 'git+ssh')) {
            versions.test.engine = 'branch';
        }

        if (_startsWith(versions.prod.preprod_engine, 'git+ssh')) {
            versions.prod.preprod_engine = 'branch';
        }

        if (_startsWith(versions.prod.engine, 'git+ssh')) {
            versions.prod.engine = 'branch';
        }
    }

    /**
     * In order not to not duplicate the filter by empty cells
     *
     * @param {IProjectVersions} versions
     *
     * @returns {void}
     */
    private absencePreprodFieldsHandler(versions: IProjectVersions): void {
        if (!_has(versions.prod, 'preprod_engine')) {
            versions.prod.preprod_engine = null;
        }

        if (!_has(versions.prod, 'preprod_theme')) {
            versions.prod.preprod_theme = null;
        }

        if (!_has(versions.prod, 'preprod_core')) {
            versions.prod.preprod_core = null;
        }
    }
}
