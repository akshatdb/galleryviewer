import { NgModule } from "@angular/core";
import { GalleryComponent } from './gallery.component';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
    declarations: [
        GalleryComponent
    ],
    imports: [
        CommonModule,
        MatIconModule
    ],
    exports: [
        GalleryComponent
    ]
})
export class GalleryModule { }