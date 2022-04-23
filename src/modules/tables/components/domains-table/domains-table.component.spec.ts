import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DomainsTableComponent } from './domains-table.component';

describe('DomainsTableComponent', () => {
    let component: DomainsTableComponent;
    let fixture: ComponentFixture<DomainsTableComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [DomainsTableComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(DomainsTableComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
