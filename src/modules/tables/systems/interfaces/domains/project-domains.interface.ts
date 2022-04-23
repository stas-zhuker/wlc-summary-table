export interface IProjectDomains {
    redmineProjectName: string;
    prodLink: string;
    affProdLink: string[];
    affBackoffice: string[];
    testLink: string;
    affTestLink: string[] | '';
    qaLink: string;
    mirrors: string[];
}

export type TDomainColumnValue =
    | 'prodLink'
    | 'affProdLink'
    | 'affBackoffice'
    | 'testLink'
    | 'affTestLink'
    | 'qaLink'
    | 'mirrors';

export interface IDomainsColumn {
    value: TDomainColumnValue;
}
