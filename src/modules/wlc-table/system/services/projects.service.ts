import { Injectable } from '@angular/core';

import _forIn from 'lodash-es/forIn';
import _startsWith from 'lodash-es/startsWith';
import _has from 'lodash-es/has';

import { IProjectVersions } from 'src/modules/wlc-table/system/interfaces/project.interface';

@Injectable({
    providedIn: 'root',
})
export class ProjectService {
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

        this.$resolve();
    }

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

    // in order not to not duplicate the filter by empty cells
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
