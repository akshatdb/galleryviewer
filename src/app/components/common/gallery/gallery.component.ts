import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit, AfterContentChecked, AfterViewChecked } from '@angular/core';
import { trigger, transition, useAnimation, state, style } from '@angular/animations';
import { scaleIn, scaleOut, fadeIn, fadeOut, AnimationType } from './gallery.animation';
import { timer, Subscription } from 'rxjs';

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
  @Input()
  circular: boolean = true;
  @Input()
  slideshow: boolean = true;
  @Input()
  slideChangeTime: number = 5000;
  containerWidth = undefined;
  currentIndex = 0;
  totalImages = 0;
  currentImage;
  showarrow = true;
  slideshowsub: Subscription;
  @ViewChild('galleryContainer') galleryContainer: ElementRef;
  ngOnInit(): void {
    this.animationType = AnimationType.Scale;
    timer(5000).subscribe(evt => this.showarrow = false);
    if (this.slideshow)
      this.startSlideShow();
  }

  ngOnChanges() {
    this.totalImages = this.images.length;
    if (!this.circular)
      this.slideshow = false;
    this.startSlideShow();
  }
  startSlideShow() {
    if (this.slideshow && this.circular && !this.slideshowsub) {
      this.slideshowsub = timer(this.slideChangeTime, this.slideChangeTime).subscribe(res => {
        this.nextPage();
      });
    }
  }
  stopSlideShow() {
    if (this.slideshowsub) {
      this.slideshowsub.unsubscribe();
      delete this.slideshowsub;
    }
  }
  ngOnDestroy() {
    this.stopSlideShow();
  }

  nextPage() {
    if (this.currentIndex < this.totalImages - 1)
      this.currentIndex++;
    else if (this.circular)
      this.currentIndex = 0;
  }
  prevPage() {
    if (this.currentIndex > 0)
      this.currentIndex--;
    else if (this.circular)
      this.currentIndex = this.totalImages - 1;
  }

  goFullscreen() {
    this.fullScreenMode = true;
  }
}
