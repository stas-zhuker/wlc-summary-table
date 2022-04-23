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

export type IDomainsColumn =
    | 'prodLink'
    | 'affProdLink'
    | 'affBackoffice'
    | 'testLink'
    | 'affTestLink'
    | 'qaLink'
    | 'mirrors';
