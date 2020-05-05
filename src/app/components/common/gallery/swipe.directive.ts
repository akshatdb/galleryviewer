import { Directive, HostListener, Output, EventEmitter, Input } from '@angular/core';

@Directive({
  selector: '[appSwipe]'
})
export class SwipeDirective {

  constructor() { }
  private swipeCoord?: [number, number];
  private swipeTime?: number;

  @Input()
  minSwipeDuration = 30;
  @Input()
  maxSwipeDuration = 1000;
  @HostListener('touchstart', ['$event'])
  swipestart(evt) {
    this.swipe(evt, 'start');
  }
  @HostListener('touchend', ['$event'])
  swipeend(evt) {
    this.swipe(evt, 'end');
  }

  @Output()
  leftSwipe: EventEmitter<any> = new EventEmitter();
  @Output()
  rightSwipe: EventEmitter<any> = new EventEmitter();


  swipe(e: TouchEvent, when: string): void {
    const coord: [number, number] = [e.changedTouches[0].clientX, e.changedTouches[0].clientY];
    const time = new Date().getTime();

    if (when === 'start') {
      this.swipeCoord = coord;
      this.swipeTime = time;
    } else if (when === 'end') {
      const direction = [coord[0] - this.swipeCoord[0], coord[1] - this.swipeCoord[1]];
      const duration = time - this.swipeTime;

      if (duration < this.maxSwipeDuration //
        && Math.abs(direction[0]) > this.minSwipeDuration // Long enough
        && Math.abs(direction[0]) > Math.abs(direction[1] * 3)) { // Horizontal enough
        const swipe = direction[0] < 0 ? 'next' : 'previous';
        if (swipe === 'next') {
          this.rightSwipe.emit({ swiped: true });
        }
        if (swipe === 'previous') {
          this.leftSwipe.emit({ swiped: true });
        }
      }
    }
  }
}
