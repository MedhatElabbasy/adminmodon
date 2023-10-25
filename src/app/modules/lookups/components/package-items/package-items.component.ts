import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalService } from 'src/app/modules/core/services/modal.service';
import { OffcanvasService } from 'src/app/modules/core/services/offcanvas.service';
//import { Package, PackageItems } from 'src/app/modules/subscriptions/models/package';
import { Package,PackageItems } from 'src/app/modules/subscriptions/models/package';
import { OptionSet } from '../../models/option-set';
import { OptionSetItemsService } from '../../services/option-set-items.service';
import { OptionsetService } from '../../services/optionset.service';
import { PackageItemsService } from '../../services/package-items.service';
import { IDropdownSettings, } from 'ng-multiselect-dropdown';
import { LangService } from 'src/app/modules/core/services/lang.service';



@Component({
  selector: 'app-package-items',
  templateUrl: './package-items.component.html',
  styleUrls: ['./package-items.component.scss']
})
export class PackageItemsComponent implements OnInit {
  id!:string|null
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
  dropdownSettings:IDropdownSettings={};
  select:any[]=[]
  packageItemID!:string
  language:string=''

  constructor(private canvasServices:OffcanvasService ,
     private modalService:ModalService,
     private _packageItems:PackageItemsService,
     private _optionSet:OptionsetService,
     public lang:LangService,
     private fb: FormBuilder) { 
          this.generatePackageForm();
          this._optionSet.getOPtionSetByName(this.services).subscribe((res)=>{
            console.log(res.optionSetItems); 
            this.list =res.optionSetItems;
            
           // this.fieldsvalues = { dataSource: this.list, text: "nameAr", value: "id" };
           this.dropdownSettings = {
            idField: 'id',
            textField: 'nameAr',
          }
            
          });
          
         // this.selectmode = ej.MultiSelectMode.VisualMode;
          
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
    const numbers = /^[0-9]{1,5}$/;
    this.packageForm=this.fb.group({
      itemName:[null,[ Validators.required,Validators.pattern(`^[\u0600-\u06ff ]+$`)]],
      itemNameEn:[null,[ Validators.required,Validators.pattern(/^[a-zA-Z\s]*$/)]],
      value:[null,[Validators.required, Validators.pattern(numbers)]],
      number:[null,[Validators.required, Validators.pattern(numbers)]],
       keysEnable:[null,[Validators.required, Validators.pattern(/^[^\s]+$/)]],
       keysDisable:[null,[Validators.required, Validators.pattern(/^[^\s]+$/)]],
      blockedService:[null,[Validators.required, Validators.pattern(/^[^\s]+$/)]],
      cost:[null,[Validators.required, Validators.pattern(numbers)]],
      isUndefined:[false],
     // myItems: [this.select]
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
 

add(){
  this.id=null
  this.openCanvas(this.canvasID)
 
}
fromZtoA()
{
  this.language="fromZtoA"
  this.getPackageItems()
}
fromAtoZ(){
  this.language="fromAtoZ"
  this.getPackageItems()
}
  onDelete(){
    console.log(this.packageItemID);
    this._packageItems.deletePackageItem(this.packageItemID).subscribe((res)=>{
      this.getPackageItems();
    })
    this.closeModal(this.modalID)
    this.getPackageItems();
  }
  addPackage(){
          // console.log(this.select);
  //          this.select=this.packageControls['myItems'].value;
  //          console.log(this.select);
  //          this.select.forEach((x)=>
  //          {
  //           this.enablelist.push(x.nameAr)
  //          })
  //          const enable=this.enablelist.join(",");
  //          console.log(enable);
           
  //         this.list.forEach((x)=>
  //         {
  //           this.disablelist.push(x.nameAr)
  //         })
  //         this.disablelist=this.disablelist.filter((ele)=>{
  //              return !this.enablelist.includes(ele);
  //         })
  //          console.log(this.disablelist);
  //          const disable=this.disablelist.join(",")
  //          console.log(disable);
           
  //  //if(this.packageForm.invalid)return;
  //  this.packageForm.controls['keysEnable'].setValue(enable);
  //  this.packageForm.controls['keysDisable'].setValue(disable);
  if(this.packageForm.invalid) return
  this.packageForm.controls['isUndefined'].setValue("true")
   let model=this.packageForm.value;
   console.log(model);
   
   this._packageItems.addPackageItem(model).subscribe((res)=>{
    this.getPackageItems();
    this.packageForm.reset();
    this.canvasServices.close(this.canvasID)
   })
   
  //  this.canvasServices.close(this.canvasID)
   
  //    this.packageForm.reset();
    //this.getPackageItems()
  }

  edit(packageItem:PackageItems){
    console.log(packageItem.id);
    
   this.packageItemID=packageItem.id
    this.packageForm.patchValue(packageItem);
     this.canvasServices.open(this.canvasID);
     this.id="gggg"
  }
  update(){
    this.id=null
    console.log("fffffff");
    this.packageForm.controls['isUndefined'].setValue("true")
    let model=this.packageForm.value
    model.id=this.packageItemID
    this._packageItems.updatePackageItem(model).subscribe((res)=>{
      this.getPackageItems();
      this.packageForm.reset();
    this.canvasServices.close(this.canvasID)
    })
    
    
   // this.getPackageItems()
  }
  exist(packageItem:PackageItems){
    this.packageItemID=packageItem.id
    this.openModal(this.modalID);
  }

  clear(){
    this.language=''
    this.getPackageItems()
  }

//   onItemSelect(item: any) {
//     console.log('onItemSelect', item);
//     //this.select.push(item)
// }
// onItemDeSelect(item: any) {
//     console.log('onItemDeSelect', item);
// }
// onSelectAll(items: any) {
//     console.log('onSelectAll', items);
// }
// onUnSelectAll() {
//     console.log('onUnSelectAll fires');
// }
}
