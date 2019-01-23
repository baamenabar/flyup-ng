import { UploadModule } from './upload.module';

describe('UploadModule', () => {
    let uploadModule: UploadModule;

    beforeEach(() => {
        uploadModule = new UploadModule();
    });

    test('should create an instance', () => {
        expect(uploadModule).toBeTruthy();
    });
});
