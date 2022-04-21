import { IIndexing } from 'src/modules/core/systems/interfaces/global.interface';

export interface IBadReleases {
    engine: IIndexing<string>;
    theme: IIndexing<string>;
    core: IIndexing<string>;
}
