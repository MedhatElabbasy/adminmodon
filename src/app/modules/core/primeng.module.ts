import { NgModule } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DropdownModule } from 'primeng/dropdown';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ToastModule } from 'primeng/toast';
import { GalleriaModule } from 'primeng/galleria';

const references: any = [
  DropdownModule,
  InputSwitchModule,
  ToastModule,
  GalleriaModule,
];

@NgModule({
  imports: [references],
  exports: [references],
  providers: [MessageService],
})
export class PrimeNgModule {}
