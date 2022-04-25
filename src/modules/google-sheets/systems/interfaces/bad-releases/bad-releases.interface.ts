import { IIndexing } from 'src/modules/core/systems/interfaces';

export interface IBadReleases {
    engine: IIndexing<string>;
    theme: IIndexing<string>;
    core: IIndexing<string>;
}
