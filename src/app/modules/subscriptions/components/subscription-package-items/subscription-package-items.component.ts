import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalService } from 'src/app/modules/core/services/modal.service';
import { OffcanvasService } from 'src/app/modules/core/services/offcanvas.service';
import { OptionsetService } from 'src/app/modules/lookups/services/optionset.service';
import { PackageItemsService } from 'src/app/modules/lookups/services/package-items.service';
import { PackageItems } from '../../models/package';

@Component({
  selector: 'app-subscription-package-items',
  templateUrl: './subscription-package-items.component.html',
  styleUrls: ['./subscription-package-items.component.scss']
})
export class SubscriptionPackageItemsComponent implements OnInit {
  canvasID="packageItem"
  modalID='deleteItem'
  searchKey=''
  pageNumber = 1;
  pageSize = 10;
  total!: number;
  sizes = [5, 10, 20, 30];
  packageID:string=''
  packageItems!:PackageItems[];
  packageForm!:FormGroup;
  optionSet:any[] = [];
  services: string='services';
  list:any[]=[];
  enablelist:any=[]
  disablelist:any[]=[]
  fieldsvalues!: Object;
  selectmode: any;
  select:any[]=[]
  packageItemID!:string
  language:string=''

  constructor(private canvasServices:OffcanvasService ,
     private modalService:ModalService,
     private _packageItems:PackageItemsService,
     private _optionSet:OptionsetService,
     private fb: FormBuilder) { 
          this.generatePackageForm();
          this._optionSet.getOPtionSetByName(this.services).subscribe((res)=>{
            console.log(res.optionSetItems); 
            this.list =res.optionSetItems;
            
       
          });
          
         
          
     }

  ngOnInit(): void {
    this.getPackageItems();
  }

  shareCheckedList(item:any[]){
    console.log(item);
  }
  shareIndividualCheckedList(item:{}){
    console.log(item);
  }

  getPackageItems(){
    this._packageItems.getAll().subscribe((res)=>{
      console.log(res);
      this.packageItems=res;
      console.log(this.packageItems);
      if(this.language == ''){
        this.packageItems
      }else if (this.language == 'fromAtoZ') {
        var x = [];
          var y = [];

          const regex = /^[A-Z a-z]/;
          for (let i = 0; i < this.packageItems.length; i++) {
            if (this.packageItems[i].itemName.match(regex)) {
              x.push(this.packageItems[i]);
            }else{
              y.push(this.packageItems[i]);
            }
          }
          this.packageItems = [...x.sort(),...y.sort()];
          x.sort((a, b) => (a.itemName < b.itemName ? -1 : 1));
          y.sort((a, b) => (a.itemName < b.itemName ? -1 : 1));
          this.packageItems = [...x,...y];
          this.language=''
      } else if (this.language == 'fromZtoA') {
        var x = [];
          var y = [];
          const regex = /^[ء-ي]/;
          for (let i = 0; i < this.packageItems.length; i++) {
            if (this.packageItems[i].itemName.match(regex)) {
              x.push(this.packageItems[i]);
            }else{
              y.push(this.packageItems[i]);
            }
          }
          this.packageItems = [...x.sort(),...y.sort()];
          x.sort((a, b) => (a.itemName < b.itemName ? -1 : 1));
          y.sort((a, b) => (a.itemName < b.itemName ? -1 : 1));
          this.packageItems = [...x,...y];
          this.language=''
      }
  
    })
  }

  generatePackageForm(){
    this.packageForm=this.fb.group({
      itemName:[null,Validators.required],
      itemNameEn:[null,Validators.required],
      value:[null,Validators.required],
      number:[null,Validators.required],
       keysEnable:[null,Validators.required],
       keysDisable:[null,Validators.required],
      blockedService:[null,Validators.required],
      cost:[null,Validators.required],
      isUndefined:[false],
     
    });
  }

  get packageControls(): any {
    return this.packageForm.controls;
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

  openCanvas(id: string) {
    this.canvasServices.open(id);
  }

  closeCanvas(id: string) {
    this.canvasServices.close(id);
  }


  
  onPageSizeChange(number: any) {
    this.pageSize = +number.target.value;
  }

  onPageChange(event: number) {
    this.pageNumber = event;
  }
 


// fromZtoA()
// {
//   this.language="fromZtoA"
//   this.getPackageItems()
// }
// fromAtoZ(){
//   this.language="fromAtoZ"
//   this.getPackageItems()
// }


  onDelete(){
    console.log(this.packageItemID);
    this._packageItems.deletePackageItem(this.packageItemID).subscribe((res)=>{
      this.closeModal(this.modalID)
      this.getPackageItems()
    })
    
    
  }
 

  edit(packageItem:PackageItems){
    console.log(packageItem.id);
    
   this.packageItemID=packageItem.id
    this.packageForm.patchValue(packageItem);
     this.canvasServices.open(this.canvasID);
    
  }

  update(){
    
    console.log("fffffff");
    this.packageForm.controls['isUndefined'].setValue("true")
    let model=this.packageForm.value
    model.id=this.packageItemID
    this._packageItems.updatePackageItem(model).subscribe((res)=>{
      this.packageForm.reset();
      this.canvasServices.close(this.canvasID)
      this.getPackageItems()
    })
   
  }
  exist(packageItem:PackageItems){
    this.packageItemID=packageItem.id
    this.openModal(this.modalID);
  }

  clear(){
    this.language=''
    this.getPackageItems()
  }


}
