import { Injectable } from '@angular/core';

import _values from 'lodash-es/values';

import { IProjectDomains } from 'src/modules/domains/systems/interfaces/project-domains.interface';

@Injectable({
    providedIn: 'root',
})
export class DomainsService {
    public ready: Promise<void> = new Promise((resolve: () => void): void => {
        this.$resolve = resolve;
    });

    private $resolve: () => void;

    private _domains: IProjectDomains[] = [];

    constructor() {
        this.fetchDomains();
    }

    public get domains(): IProjectDomains[] {
        return this._domains;
    }

    private async fetchDomains(): Promise<void> {
        const response = await fetch('https://keepalive.egamings.com/wlc_domains.json');
        const domains = await response.json();

        this._domains = _values(domains);

        this.$resolve();
    }
}
