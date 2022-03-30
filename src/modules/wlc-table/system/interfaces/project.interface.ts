export interface IProjectVersions {
    qa: IVersionsInEnv;
    test: IVersionsInEnv;
    prod: IVersionsInProd;
    il_live?: boolean;
    title: string;
}

export interface IVersionsInEnv {
    engine: string;
    theme: string;
    core: string;
    php: string;
}

export interface IVersionsInProd extends IVersionsInEnv {
    preprod_core?: string;
    preprod_theme?: string;
    preprod_engine?: string;
    il_live?: boolean;
}

export interface IVersionsEnvColumn {
    env: TEnvType;
    elems: number;
    header: string;
}

export type TEnvType = 'qa' | 'test' | 'preprod' | 'prod';

export type TDepType = 'engine' | 'theme' | 'core' | 'php';
