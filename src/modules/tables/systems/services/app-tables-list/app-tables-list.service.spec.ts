import { TestBed } from '@angular/core/testing';

import { AppTablesListService } from './app-tables-list.service';

describe('AppTablesListService', () => {
    let service: AppTablesListService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(AppTablesListService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
