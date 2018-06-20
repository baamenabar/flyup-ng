import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FileListComponent } from './file-list/file-list.component';
import { DirPathComponent } from './dir-path/dir-path.component';

@NgModule({
    declarations: [AppComponent, FileListComponent, DirPathComponent],
    imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
