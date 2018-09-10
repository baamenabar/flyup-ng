import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FileListComponent } from './file-list/file-list.component';
import { MatTableModule, MatSortModule, MatIconModule, MatButtonModule, MatToolbarModule } from '@angular/material';
import { BytesPipe } from './pipes/bytes.pipe';
import { FileWindowComponent } from './file-window/file-window.component';
import { UploadModule } from './upload/upload.module';
import { NavActionBarComponent } from './nav-action-bar/nav-action-bar.component';

@NgModule({
    declarations: [AppComponent, FileListComponent, BytesPipe, FileWindowComponent, NavActionBarComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        HttpClientModule,
        MatTableModule,
        MatToolbarModule,
        MatSortModule,
        MatIconModule,
        MatButtonModule,
        UploadModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
