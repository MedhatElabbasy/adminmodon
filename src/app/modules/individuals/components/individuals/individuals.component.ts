import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';
import { Routing } from 'src/app/modules/core/routes/app-routes';
import { OffcanvasService } from 'src/app/modules/core/services/offcanvas.service';

@Component({
  selector: 'app-individuals',
  templateUrl: './individuals.component.html',
  styleUrls: ['./individuals.component.scss']
})
export class IndividualsComponent implements OnInit {
  @ViewChild('form') form!: FormGroupDirective;
  links = {
    gurads: `${Routing.individuals.children.guards}`,
    clients: `${Routing.individuals.children.clients}`,
  };
  userForm!: FormGroup;
  canvasID = 'add-gurad';


  constructor( private canvasServices: OffcanvasService,) { }

  ngOnInit(): void {
  }

  openCanvas(id:string){
    this.canvasServices.open(id);
  }
}
