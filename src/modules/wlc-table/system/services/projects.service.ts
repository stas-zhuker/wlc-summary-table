import { Injectable } from '@angular/core';

import _forIn from 'lodash-es/forIn';
import _startsWith from 'lodash-es/startsWith';

import { IProjectVersions } from 'src/modules/wlc-table/system/interfaces/project.interface';
import projectsData from 'src/assets/projects.json';

@Injectable({
    providedIn: 'root',
})
export class ProjectService {
    private _projects: IProjectVersions[] = [];

    constructor() {
        this.fetchProjects();
    }

    public get projects(): IProjectVersions[] {
        return this._projects;
    }

    public set projects(newProjects) {
        this._projects = newProjects;
    }

    private async fetchProjects(): Promise<void> {
        _forIn(projectsData, (projectVersions) => {
            this.engineBranchHandler(projectVersions);
            this._projects.push(projectVersions);
        });
    }

    private async engineBranchHandler(versions: IProjectVersions): Promise<void> {
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
}
