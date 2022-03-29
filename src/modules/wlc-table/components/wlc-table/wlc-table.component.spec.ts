import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WlcTableComponent } from './wlc-table.component';

describe('WlcTableComponent', () => {
    let component: WlcTableComponent;
    let fixture: ComponentFixture<WlcTableComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [WlcTableComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(WlcTableComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
