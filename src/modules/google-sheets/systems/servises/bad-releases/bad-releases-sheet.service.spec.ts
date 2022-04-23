import { TestBed } from '@angular/core/testing';

import { BadReleasesSheetService } from './bad-releases-sheet.service';

describe('BadReleasesSheetService', () => {
    let service: BadReleasesSheetService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(BadReleasesSheetService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
