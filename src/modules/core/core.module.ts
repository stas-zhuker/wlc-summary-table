import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from 'src/modules/app/app-routing.module';
import { LocalStorageService } from 'src/modules/core/systems/services/local-storage/local-storage.service';

import { HeaderComponent } from './components/header/header.component';

@NgModule({
    declarations: [HeaderComponent],
    imports: [CommonModule, AppRoutingModule],
    providers: [LocalStorageService],
    exports: [HeaderComponent],
})
export class CoreModule {}
