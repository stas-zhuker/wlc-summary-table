import { Component, HostBinding, Input, OnInit } from '@angular/core';

import _forEach from 'lodash-es/forEach';
import _reverse from 'lodash-es/reverse';
import _map from 'lodash-es/map';

import { IProjectVersions, TDepType, TEnvType } from 'src/modules/wlc-table/system/interfaces/project.interface';
import { ProjectService } from 'src/modules/wlc-table/system/services/projects.service';

@Component({
    selector: 'app-versions-selector',
    templateUrl: './versions-selector.component.html',
    styleUrls: ['./versions-selector.component.scss'],
})
export class VersionsSelectorComponent implements OnInit {
    @HostBinding('class') public $hostClass = 'versions-selector';

    @Input() public env: TEnvType;

    @Input() public item: TDepType;

    public projectsVersions: IProjectVersions[] = [];

    constructor(protected projectService: ProjectService) {}

    public async ngOnInit(): Promise<void> {
        await this.projectService.ready;
        this.projectsVersions = this.projectService.projects;
    }

    public getVersionsList(env: string, item: string): object[] {
        let versionsArr = [];

        if (env !== 'preprod') {
            _forEach(this.projectsVersions, (project) => {
                if (!!project[env][item]) {
                    versionsArr.push(project[env][item]);
                } else {
                    versionsArr.push('-');
                }
            });
        } else {
            _forEach(this.projectsVersions, (project) => {
                if (!!project.prod['preprod_' + item]) {
                    versionsArr.push(project.prod['preprod_' + item]);
                } else {
                    versionsArr.push('-');
                }
            });
        }

        versionsArr = [...new Set(versionsArr)];
        versionsArr = _reverse(versionsArr.sort());
        // it is better not to touch the lines below
        versionsArr = _map(versionsArr, (value) => {
            return { label: value, value: value };
        });

        return versionsArr;
    }
}
