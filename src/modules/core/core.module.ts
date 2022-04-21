import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocalStorageService } from 'src/modules/core/systems/services/local-storage.service';

@NgModule({
    declarations: [],
    imports: [CommonModule],
    providers: [LocalStorageService],
})
export class CoreModule {}
