import { FileUploadInterface } from '../file-upload.interface';
import { Subject } from 'rxjs';

export const MockUploadService = {
    files: [],

    fileComplete: new Subject<FileUploadInterface>().asObservable(),

    addFiles(selectedFiles: FileList) {},

    cancelFileUpload(file: FileUploadInterface) {},

    retryUpload(file: FileUploadInterface) {},
};

/**
 * Data mock.
 */
export const mockedFileList: FileUploadInterface[] = [
    {
        data: new File([], 'someTestFilename.jpg'),
        targetDir: '',
        status: 'checking',
        inProgress: false,
        progress: 50,
        canRetry: true,
        canCancel: true,
    },
    {
        data: new File([], 'test2.jpg'),
        targetDir: '',
        status: 'waiting',
        inProgress: false,
        progress: 1,
        canRetry: true,
        canCancel: true,
    },
];
