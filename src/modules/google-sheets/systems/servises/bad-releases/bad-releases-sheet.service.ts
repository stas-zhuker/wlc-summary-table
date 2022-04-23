import { Injectable } from '@angular/core';

import { IBadReleases } from 'src/modules/google-sheets/systems/interfaces/bad-releases/bad-releases.interface';

@Injectable({
    providedIn: 'root',
})
export class BadReleasesSheetService {
    public ready: Promise<void> = new Promise((resolve: () => void): void => {
        this.$resolve = resolve;
    });

    /**
     * Bad releases arrays
     */
    public badReleases: IBadReleases;

    private $resolve: () => void;

    private endPoint: string =
        'https://script.googleusercontent.com/a/macros/softgamings.com/echo?user_content_key=6ROVRuSNHZswjnlNKqdKbo6h860Ija3tb3jHTZ68nE8bEvMFK7sySnafkL6etZiqPl-KTCRXe9jQrPfh9LXHQatcuCSB04BUOJmA1Yb3SEsKFZqtv3DaNYcMrmhZHmUMi80zadyHLKA4tLZFWIDTpYrXU7XiN1evyc5IGh1q_XJlQS4w2ulH4Y_AaP5Jwkg14IAAjamsHIlkm7nFWx-PEDMbf1XD2lUy5AP8LPEuXTaB_b70M1bYSOVxNQx8r5TM0i4zqwG2w8-agQEneoX2wQ&lib=M6YaBN_X95p47_xUzDb94NFi0jIB_sPam';

    constructor() {
        this.getbadReleases();
    }

    private async getbadReleases(): Promise<void> {
        const res = await fetch(this.endPoint);
        const data = await res.json();
        this.badReleases = data;
        this.$resolve();
    }
}
