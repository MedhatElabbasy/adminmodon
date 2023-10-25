import {
  Directive,
  Input,
  SimpleChanges,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';

@Directive({
  selector: '[appContractAccess]',
})
export class ContractAccessDirective {
  @Input('status') public status: number[] = [];
  @Input('allowed') public allowed: number[] = [];

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.

    this.checkAvailability();
  }

  checkAvailability() {
    const isAllowed = this.status.filter((e) => this.allowed.includes(e));

    if (isAllowed?.length) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }
}
