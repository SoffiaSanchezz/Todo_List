import { Component, ElementRef, ViewChild, OnDestroy, Input, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import lottie from 'lottie-web';

@Component({
  selector: 'app-loader',
  template: `
    <div class="loader-overlay" *ngIf="visible">
      <div #lottieContainer class="lottie-container"></div>
      <div class="loader-text" *ngIf="message">{{ message }}</div>
    </div>
  `,
  styles: [`
    .loader-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(17, 24, 39, 0.85);
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      z-index: 9999;
      backdrop-filter: blur(10px);
    }
    .lottie-container {
      width: 180px;
      height: 180px;
      filter: drop-shadow(0 0 10px rgba(167, 139, 250, 0.5));
    }
    .loader-text {
      color: rgba(243, 244, 246, 1);
      margin-top: 1.5rem;
      font-size: 1.1rem;
      font-weight: 600;
      letter-spacing: 0.05em;
      font-family: 'Quicksand', sans-serif;
    }
  `],
  standalone: true,
  imports: [CommonModule]
})
export class LoaderComponent implements AfterViewInit, OnChanges, OnDestroy {
  @ViewChild('lottieContainer', { static: false }) lottieContainer!: ElementRef;
  @Input() visible: boolean = false;
  @Input() message: string = '';

  private animation: any;

  ngAfterViewInit() {
    if (this.visible) {
      this.initAnimation();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['visible']) {
      if (this.visible) {
        // We need a small delay to ensure ViewChild is updated if we use *ngIf
        setTimeout(() => this.initAnimation(), 0);
      } else {
        this.destroyAnimation();
      }
    }
  }

  private initAnimation() {
    this.destroyAnimation();
    
    if (this.lottieContainer && this.lottieContainer.nativeElement) {
      this.animation = lottie.loadAnimation({
        container: this.lottieContainer.nativeElement,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: 'assets/animation/clocktime.json'
      });
    }
  }

  private destroyAnimation() {
    if (this.animation) {
      this.animation.destroy();
      this.animation = null;
    }
  }

  ngOnDestroy() {
    this.destroyAnimation();
  }
}
