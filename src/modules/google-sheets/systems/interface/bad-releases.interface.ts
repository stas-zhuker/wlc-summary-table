import { IIndexing } from 'src/modules/wlc-table/system/interfaces/global.interface';

export interface IBadReleases {
    engine: IIndexing<string>;
    theme: IIndexing<string>;
    core: IIndexing<string>;
}
