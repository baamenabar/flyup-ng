import { NgModule } from '@angular/core';
import { FlyupNgLibComponent } from './flyup-ng-lib.component';
import { FileListComponent } from './file-list/file-list.component';

@NgModule({
    declarations: [FlyupNgLibComponent, FileListComponent],
    imports: [],
    exports: [FlyupNgLibComponent, FileListComponent],
})
export class FlyupNgLibModule {}
