import {
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { PAGE_SIZES } from 'src/app/modules/core/data/page-sizes';
import { LangService } from 'src/app/modules/core/services/lang.service';
import { ModalService } from 'src/app/modules/core/services/modal.service';
import { OffcanvasService } from 'src/app/modules/core/services/offcanvas.service';
import { PackageItemsService } from 'src/app/modules/lookups/services/package-items.service';

import { Package, PackageDetails, PackageItems } from '../../models/package';
import { PackageService } from '../../services/package.service';

@Component({
  selector: 'app-subscriptions-plan',
  templateUrl: './subscriptions-plan.component.html',
  styleUrls: ['./subscriptions-plan.component.scss'],
})
export class SubscriptionsPlanComponent implements OnInit {
  @ViewChildren('checkBox') checkBoxes!: QueryList<ElementRef>;
  model: any;
  id!: string | null;
  canvasID = 'addNewPackage';
  modalID = 'deletePackage';
  addmodal = 'Limit';
  searchKey = '';
  pageNumber = 1;
  pageSize = 5;
  total!: number;
  sizes = [...PAGE_SIZES];
  packages!: Package[];
  pakageItems!: PackageItems[];
  newPackageForm!: FormGroup;
  limitForm!: FormGroup;
  pakageItemID!: any;
  items: any;
  selectedPackageID!: string;
  isSelected = false;
  Items!: Package;
  adds: {}[] = [];
  selectedChange: {}[] = [];
  deleteChange: {}[] = [];
  ids: any = [];
  limit: any;
  item: any;
  event: any;
  additionalFeatures = 'additionalFeatures';
  constructor(
    private _package: PackageService,
    private canvasServices: OffcanvasService,
    private modalService: ModalService,
    public lang: LangService,
    private _packageItems: PackageItemsService,
    private fb: FormBuilder
  ) {
    this.generatePackageForm();
    this.generateLimitForm();
    this._packageItems.getAll().subscribe((res) => {
      this.pakageItems = res;
      console.log('sssssssss');

      console.log(this.pakageItems);
    });
  }

  ngOnInit(): void {
    this.getPackage();
    this.generatePackageForm();
    this._packageItems.getAll().subscribe((res) => {
      this.pakageItems = res;

      console.log(this.pakageItems);
      this.pakageItems.map((el: any) => {
        el.isSelected = false;
      });
    });
    console.log(this.checkBoxes);
  }

  get packageControls(): any {
    console.log('package controls');
    return this.newPackageForm.controls;
  }

  get limitControls(): any {
    return this.limitForm.controls;
  }

  onPageSizeChange(number: any) {
    this.pageSize = +number.target.value;
  }

  onPageNumberChange(event: number) {
    this.pageNumber = event;
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

  openCanvas(id: string) {
    this.canvasServices.open(id);
    console.log(this.checkBoxes);
  }

  closeCanvas(id: string) {
    this.canvasServices.close(id);
    this.adds = [];
    this.checkBoxes.forEach((box) => {
      box.nativeElement.checked = false;
    });
  }

  reset() {
    this.newPackageForm.reset();
    this.checkBoxes.forEach((box) => {
      box.nativeElement.checked = false;
    });
  }

  submitLimit() {
    if (this.limitForm.invalid) return;
    this.limit = this.limitForm.controls['limit'].value;
    console.log(this.limit);
    this._package.limit.next(this.limit);
    this.closeModal(this.addmodal);
    this.limitForm.reset();
    if (this.id == null) {
      this.addPush();
    } else {
      this.editDone();
    }
  }

  getPackage() {
    this._package.getAll().subscribe((res) => {
      this.packages = res;
      console.log(this.packages);
    });
  }

  generatePackageForm() {
    const numbers = /^[0-9]{1,5}$/;
    this.newPackageForm = this.fb.group({
      packageName: [null, [Validators.required]],
      packageNameEn: [null, [Validators.required]],
      packageDescription: [null, [Validators.required]],
      packageDescriptionEn: [null, [Validators.required]],
      packageTotalCost: [
        null,
        [Validators.required, Validators.pattern(numbers)],
      ],
      // packageItems:new FormArray ([], [Validators.required])
    });
  }

  generateLimitForm() {
    this.limitForm = this.fb.group({
      limit: [null, Validators.required],
    });
  }

  addPush() {
    this.adds.push({
      packageItemsId: this.item.id,
      limit: this.limit,
      isAvilable: true,
    });
  }

  cancel() {
    this.closeModal(this.addmodal);
    this.event.target.checked = false;
  }
  onChange(item: PackageItems, event: Event | any) {
    console.log(item);
    this.item = item;
    this.event = event;
    console.log(this.event);

    //  if(this.pakageItems.includes(item)){
    //   console.log("truer");

    //  }else{
    //   console.log("false");

    //  }
    if (event.target.checked) {
      this.openModal(this.addmodal);

      // let limit = this.submitLimit();
      // this.adds.push({
      //   "packageItemsId": item.id,
      //   "limit": limit,
      //   "isAvilable": true
      // });
      // console.log(this.adds);

      // console.log(this.adds);
    } else {
      // console.log(this.adds);
      //  let index = this.adds.findIndex((x:any) => x == item);
      //   console.log(index);
      // // this.adds[index].packageItems.isSelected=false
      // // this.adds.reduce(item)
      //   this.adds.splice(index,1)
      this.adds.forEach((element: any, index) => {
        if (element.packageItemsId == item.id) {
          console.log(item);

          console.log(element);

          this.adds.splice(index, 1);
        }
      });
    }

    console.log(this.adds);
  }

  add() {
    console.log('kkkkkk');
    this.id = null;
    this.adds = [];
    // this.pakageItems.map((el:any)=>{
    //   el.isSelected=false
    // })

    this.newPackageForm.reset();
    this.openCanvas(this.canvasID);
  }

  addPackage() {
    console.log(this.newPackageForm.errors);
    console.log(this.newPackageForm.invalid);
    // const invalid = [];
    // const controls = this.newPackageForm.controls;
    //     for (const name in controls) {
    //         if (controls[name].invalid) {
    //             invalid.push(name);
    //         }
    //     }
    //     console.log(invalid);

    // console.log(this.newPackageForm.controls['packageItems'].value);
    this.model = {
      packageName: this.newPackageForm.controls['packageName'].value,
      packageNameEn: this.newPackageForm.controls['packageNameEn'].value,
      packageDescription:
        this.newPackageForm.controls['packageDescription'].value,
      packageDescriptionEn:
        this.newPackageForm.controls['packageDescriptionEn'].value,
      packageTotalCost: this.newPackageForm.controls['packageTotalCost'].value,
      packageDetails: [],
    };
    this.adds.forEach((element: any) => {
      this.model.packageDetails.push(element);
    });
    console.log(this.model.packageDetails);

    if (this.newPackageForm.invalid) return;
    console.log(this.model);
    this._package.addPackage(this.model).subscribe((res) => {
      this.closeCanvas(this.canvasID);
      //this.item.isSelected = false
      this.getPackage();
    });
  }

  edit(selectedPackage: Package) {
    // var array3:any =  [];
    // array3.map((el:any)=>{
    //   el.isSelected=false;
    // })
    // this.adds=[]
    this.Items = selectedPackage;
    console.log(this.Items);

    // this.pakageItems.map((el:any)=>{
    //   el.isSelected=false
    // })
    //console.log(this.pakageItems);

    // console.log(selectedPackage);
    // console.log(selectedPackage.packageDetails);
    // selectedPackage.packageDetails.forEach(element => {
    //   this.adds.push(element.packageItems)
    // });

    console.log(this.adds);

    // var ids = this.adds.map( (el:any) => el.id );
    // ids = Array.from(new Set(ids)); // Get unique ids as set are always unique
    // array3 = this.pakageItems.filter( (el:any) => ids.indexOf(el.id)!==-1);
    // console.log(array3);
    // array3.map((el:any)=>{
    //   el.isSelected=true
    // })
    console.log(this.pakageItems);
    // this.adds.forEach((x: any, index: any) => {
    //  debugger
    //   this.pakageItems.forEach((y: any, index: any) => {
    //     if (x.packageItemsId == y.id) {
    //       console.log(x.packageItemsId);
    //       console.log('true')
    //      x.pakageItems[index].isSelected=true
    //     }else{
    //       console.log('false');

    //       x.pakageItems[index].isSelected=false
    //     }

    //   });
    // })

    this.selectedPackageID = selectedPackage.id;
    this.newPackageForm.patchValue(selectedPackage);
    this.canvasServices.open(this.canvasID);
    this.id = 'gggg';
  }

  onEdit(selectedPackage: Package) {
    selectedPackage.packageDetails.forEach((item) => {
      this.ids.push(item.id);
    });
  }

  compareItem(item: any): boolean {
    var isThere = false;
    this.adds.forEach((x: any) => {
      if (item.id == x.id) {
        isThere = true;
      }
    });
    return isThere;
  }

  update() {
    this.id = null;
    console.log('fffffff');
    const model: any = {
      packageName: this.newPackageForm.controls['packageName'].value,
      packageNameEn: this.newPackageForm.controls['packageNameEn'].value,
      packageDescription:
        this.newPackageForm.controls['packageDescription'].value,
      packageDescriptionEn:
        this.newPackageForm.controls['packageDescriptionEn'].value,
      packageTotalCost: this.newPackageForm.controls['packageTotalCost'].value,
      packageDetails: [],
      deletePackageDetails: [],
    };
    // this.adds.forEach((element: any) => {
    //   model.packageDetails.push({
    //     "packageId":"7fca2c53-473c-4031-9638-08daf88103b9",
    //     "packageItemsId": "7fca2c53-473c-4031-9638-08daf88103b9",
    //     "limit": 0,
    //     "isAvilable": true
    //   })
    // });
    console.log(model);

    model.id = this.selectedPackageID;
    this._package.updatePackage(model).subscribe((res) => {
      this.getPackage();
    });
    this.newPackageForm.reset();
    this.canvasServices.close(this.canvasID);
  }
  exist(selectedPackage: Package) {
    this.selectedPackageID = selectedPackage.id;
    this.openModal(this.modalID);
  }

  onDelete() {
    this._package.deletePackage(this.selectedPackageID).subscribe((res) => {
      this.closeModal(this.modalID);
      this.getPackage();
    });
  }

  editFeatures(selectedPackage: Package) {
    console.log('Ddddddd');

    console.log(selectedPackage);

    this.adds = [];
    this.Items = selectedPackage;
    this.selectedPackageID = selectedPackage.id;
    this.selectedChange = selectedPackage.packageDetails;
    selectedPackage.packageDetails.forEach((element) => {
      this.adds.push(element.packageItems);
    });
    this.canvasServices.open(this.additionalFeatures);
  }

  Change(item: PackageItems, event: Event | any) {
    this.id = 'ddddd';
    this.event = event;
    this.item = item;
    if (event.target.checked) {
      this.openModal(this.addmodal);
    } else {
      console.log('else');
      console.log(this.adds);

      this.selectedChange.forEach((element: any, index) => {
        if (element.packageItems.id == item.id) {
          console.log(item);

          console.log(element);
          this._package.deletePackageDetails(element.id).subscribe((res) => {
            console.log(res);
          });
          this.adds.splice(index, 1);
        }
      });
    }
  }
  editDone() {
    let model: any = {
      packageId: this.selectedPackageID,
      packageItemsId: this.item.id,
      limit: this.limit,
      isAvilable: true,
    };

    this._package.addPackageDetails(model).subscribe((res) => {
      console.log(res);
    });
  }

  submitFeatures() {
    this.canvasServices.close(this.additionalFeatures);
    this.adds = [];
    this.checkBoxes.forEach((box) => {
      box.nativeElement.checked = false;
    });
    this.getPackage();
  }
}
