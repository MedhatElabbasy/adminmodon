import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { Language } from '../../data/languages';
import { LangService } from '../../services/lang.service';
import { OffcanvasService } from '../../services/offcanvas.service';

@Component({
  selector: 'app-offcanvas',
  templateUrl: './offcanvas.component.html',
  styleUrls: ['./offcanvas.component.scss'],
})
export class OffcanvasComponent implements OnInit {
  @Input() id!: string;

  @Input() width!: string;

  private element: any;
  isRtl!: boolean;
  constructor(
    private lang: LangService,
    private canvasService: OffcanvasService,
    private el: ElementRef
  ) {
    this.element = el.nativeElement;
  }

  ngOnInit() {
    this.dirListener();
    // ensure id attribute exists
    if (!this.id) {
      return;
    }

    // move element to bottom of page (just before </body>) so it can be displayed above everything else
    document.body.appendChild(this.element);

    // close modal on background click
    this.element.addEventListener('click', (el: any) => {
      if (el.target.className === 'modal-backdrop') {
        this.close();
      }
    });

    // add self (this modal instance) to the modal service so it's accessible from controllers
    this.canvasService.add(this);
  }

  dirListener() {
    this.lang.language.subscribe((res) => {
      this.isRtl = res == Language.ar;
    });
  }

  // remove self from modal service when component is destroyed
  ngOnDestroy(): void {
    this.canvasService.remove(this.id);
    this.element.remove();
  }

  // open modal
  open(): void {
    document.getElementById(this.id + '-canvas-open')?.click();
  }

  // close modal
  close(): void {
    document.getElementById(this.id + '-canvas-close')?.click();
  }
}
