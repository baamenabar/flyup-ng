import { Subscription } from 'rxjs';

export interface FileUploadInterface {
    data: File;
    targetDir: string;
    status: string;
    inProgress: boolean;
    progress: number;
    canRetry: boolean;
    canCancel: boolean;
    sub?: Subscription;
}
