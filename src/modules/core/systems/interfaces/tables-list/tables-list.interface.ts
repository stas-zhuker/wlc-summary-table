import { TGoogleTableName } from 'src/modules/google-sheets/systems/interfaces';
import { TAppTableName } from 'src/modules/tables/systems/interfaces';

export type TTableFrom = 'app' | 'google';
export type TTargetAttribure = '_blank' | '_self' | '_parent' | '_top';

export interface ITablesListItem {
    /**
     * Name of table to show in tab
     */
    tableName: TGoogleTableName | TAppTableName;
    /**
     * Table from app or from google sheets
     */
    tableFrom: TTableFrom;
    /**
     * Table route or link
     */
    tableLink: string;
    /**
     * target attribute to link
     */
    linkTarget?: TTargetAttribure;
    /**
     * Link tab order
     */
    linkOrder: number;
}
