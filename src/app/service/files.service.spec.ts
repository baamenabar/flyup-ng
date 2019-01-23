import { TestBed, inject } from '@angular/core/testing';

import { FilesService } from './files.service';
import { HttpClientModule } from '@angular/common/http';

describe('FilesService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientModule],
            providers: [FilesService],
        });
    });

    test('should be created', inject([FilesService], (service: FilesService) => {
        expect(service).toBeTruthy();
    }));
});
