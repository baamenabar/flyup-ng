import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FileWindowComponent } from './file-window/file-window.component';
import { UploadModule } from './upload/upload.module';

const routes: Routes = [{ path: '**', component: FileWindowComponent }];
@NgModule({
    imports: [RouterModule.forRoot(routes), UploadModule],
    exports: [RouterModule],
})
export class AppRoutingModule {}
