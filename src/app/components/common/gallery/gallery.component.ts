import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit, AfterContentChecked, AfterViewChecked } from '@angular/core';
import { trigger, transition, useAnimation } from '@angular/animations';
import { scaleIn, scaleOut, fadeIn, fadeOut, AnimationType } from './gallery.animation';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
  animations: [
    trigger("slideAnimation", [
      transition("void => scale", [
        useAnimation(scaleIn, { params: { time: "500ms" } })
      ]),
      transition("scale => void", [
        useAnimation(scaleOut, { params: { time: "500ms" } })
      ]),
      transition("void => fade", [
        useAnimation(fadeIn, { params: { time: "500ms" } })
      ]),
      transition("fade => void", [
        useAnimation(fadeOut, { params: { time: "500ms" } })
      ])
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
  @ViewChild('galleryContainer') galleryContainer: ElementRef;
  ngOnInit(): void {
    this.animationType = AnimationType.Scale;
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
