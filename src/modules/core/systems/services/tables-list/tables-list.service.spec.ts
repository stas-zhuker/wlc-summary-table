import { TestBed } from '@angular/core/testing';

import { TablesListService } from './tables-list.service';

describe('TablesListService', () => {
    let service: TablesListService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(TablesListService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
