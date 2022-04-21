import { Component, HostBinding, Input, OnInit } from '@angular/core';

import _forEach from 'lodash-es/forEach';
import _reverse from 'lodash-es/reverse';
import _map from 'lodash-es/map';

import {
    IProjectVersions,
    IVersionsListItem,
    TDepType,
    TEnvType,
} from 'src/modules/versions/system/interfaces/project.interface';
import { ProjectService } from 'src/modules/versions/system/services/projects.service';

@Component({
    selector: 'app-versions-selector',
    templateUrl: './versions-selector.component.html',
    styleUrls: ['./versions-selector.component.scss'],
})
export class VersionsSelectorComponent implements OnInit {
    @HostBinding('class') public $hostClass = 'versions-selector';

    /**
     * enviroment name
     */
    @Input() public env: TEnvType;

    /**
     * item in enviroment
     */
    @Input() public item: TDepType;

    /**
     * versions list
     */
    public versionsList: IVersionsListItem[] = [];

    /**
     * project versions array
     */
    protected projectsVersions: IProjectVersions[] = [];

    constructor(protected projectService: ProjectService) {}

    public async ngOnInit(): Promise<void> {
        await this.projectService.ready;
        this.projectsVersions = this.projectService.projects;
        this.setVersionsList();
    }

    /**
     * Set versions list
     */
    protected setVersionsList(): void {
        let versionsArr = [];

        if (this.env !== 'preprod') {
            _forEach(this.projectsVersions, (project) => {
                versionsArr.push(project[this.env][this.item]);
            });
        } else {
            _forEach(this.projectsVersions, (project) => {
                versionsArr.push(project.prod['preprod_' + this.item]);
            });
        }

        versionsArr = [...new Set(versionsArr)];
        versionsArr = _reverse(versionsArr.sort());
        // it is better not to touch the lines below
        versionsArr = _map(versionsArr, (value) => {
            return { label: value, value: value };
        });

        this.versionsList = versionsArr;
    }
}
