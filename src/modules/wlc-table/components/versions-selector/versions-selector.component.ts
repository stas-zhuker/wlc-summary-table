import { Component, Input, OnInit } from '@angular/core';

import _forEach from 'lodash-es/forEach';
import _reverse from 'lodash-es/reverse';

import { IProjectVersions, TEnvType } from 'src/modules/wlc-table/system/interfaces/project.interface';
import { ProjectService } from 'src/modules/wlc-table/system/services/projects.service';

@Component({
    selector: 'app-versions-selector',
    templateUrl: './versions-selector.component.html',
    styleUrls: ['./versions-selector.component.scss'],
})
export class VersionsSelectorComponent implements OnInit {
    @Input() public env: TEnvType;

    @Input() public item: string;

    public projectsVersions: IProjectVersions[] = [];

    constructor(protected projectService: ProjectService) {}

    ngOnInit(): void {
        this.projectsVersions = this.projectService.projects;
    }

    public getVersionsList(env: string, item: string): string[] {
        const versionsArr = new Set();

        if (env !== 'preprod') {
            _forEach(this.projectsVersions, (project) => {
                if (!!project[env][item]) {
                    versionsArr.add(project[env][item]);
                } else {
                    versionsArr.add('-');
                }
            });
        } else {
            _forEach(this.projectsVersions, (project) => {
                if (!!project.prod['preprod_' + item]) {
                    versionsArr.add(project.prod['preprod_' + item]);
                } else {
                    versionsArr.add('-');
                }
            });
        }

        // @ts-ignore
        return _reverse([...versionsArr].sort());
    }
}
