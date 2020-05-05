import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit, AfterContentChecked, AfterViewChecked } from '@angular/core';
import { trigger, transition, useAnimation, state, style } from '@angular/animations';
import { scaleIn, scaleOut, fadeIn, fadeOut, AnimationType } from './gallery.animation';
import { timer } from 'rxjs';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
  animations: [
    trigger("slideAnimation", [
      state('show', style({
        display: 'block'
      })),
      state('hide', style({
        display: 'none'
      })),
      transition("hide => show", [
        useAnimation(scaleIn, { params: { time: "500ms" } })
      ]),
      transition("show => hide", [
        useAnimation(scaleOut, { params: { time: "500ms" } })
      ]),
      // transition("void => fade", [
      //   useAnimation(fadeIn, { params: { time: "500ms" } })
      // ]),
      // transition("fade => void", [
      //   useAnimation(fadeOut, { params: { time: "500ms" } })
      // ])
    ])
  ]
})
export class GalleryComponent implements OnInit {

  constructor() { }

  @Input()
  images: Array<string> = [];
  @Input()
  animationType: AnimationType;
  @Input()
  fullScreenMode: boolean = false;
  containerWidth = undefined;
  currentIndex = 0;
  totalImages = 0;
  currentImage;
  showarrow = true;
  @ViewChild('galleryContainer') galleryContainer: ElementRef;
  ngOnInit(): void {
    this.animationType = AnimationType.Scale;
    timer(5000).subscribe(evt => this.showarrow = false);
  }

  ngOnChanges() {
    this.totalImages = this.images.length;
  }

  nextPage() {
    if (this.currentIndex < this.totalImages)
      this.currentIndex++;
  }
  prevPage() {
    if (this.currentIndex > 0)
      this.currentIndex--;
  }

  goFullscreen() {
    this.fullScreenMode = true;
  }
}
