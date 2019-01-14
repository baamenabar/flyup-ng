import { TestBed, inject } from '@angular/core/testing';

import { ThingsService } from './things.service';
import { HttpClientModule } from '@angular/common/http';

describe('FilesService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientModule],
            providers: [ThingsService],
        });
    });

    it('should be created', inject([ThingsService], (service: ThingsService) => {
        expect(service).toBeTruthy();
    }));
});
