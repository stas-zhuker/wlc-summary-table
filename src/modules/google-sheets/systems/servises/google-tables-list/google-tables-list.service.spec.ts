import { TestBed } from '@angular/core/testing';

import { GoogleTablesListService } from './google-tables-list.service';

describe('GoogleTablesListService', () => {
    let service: GoogleTablesListService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(GoogleTablesListService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
