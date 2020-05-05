import { NgModule } from "@angular/core";
import { GalleryComponent } from './gallery.component';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { SwipeDirective } from './swipe.directive';

@NgModule({
    declarations: [
        GalleryComponent,
        SwipeDirective
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