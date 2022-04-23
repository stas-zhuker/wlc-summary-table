import { ITablesListItem } from 'src/modules/core/systems/interfaces';

export type TAppTableName = 'Versions' | 'Domains';

export type TAppTableState = 'versions' | 'domains';

export interface IAppTablesListItem extends ITablesListItem {
    tableLink: TAppTableState;
}
