import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Pagination } from 'src/app/modules/core/models/pagination';
import { ModalService } from 'src/app/modules/core/services/modal.service';
import { OffcanvasService } from 'src/app/modules/core/services/offcanvas.service';
import { OptionSet, OptionSetItems } from '../../models/option-set-items';
import { staticPages } from '../../models/static-pages';
import { OptionSetItemsService } from '../../services/option-set-items.service';
import { OptionsetService } from '../../services/optionset.service';
import { StaticpagesService } from '../../services/staticpages.service';

@Component({
  selector: 'app-static-pages',
  templateUrl: './static-pages.component.html',
  styleUrls: ['./static-pages.component.scss']
})
export class StaticPagesComponent implements OnInit {

  pageNumber = 1;
  pageSize = 10;
  total!: number;
  sizes = [5, 10, 20, 30];
  Pages!: staticPages[];
  canvasID = 'setting-canvas';
  modalID = 'delete-setting';
  staticPagesForm!: FormGroup;
  selectedPage!: staticPages | null;
  optionSets!:OptionSet[];
  optionSetIdContorl!:FormControl
  optionsetItems!:OptionSetItems[];

  pageSubscriber!: Subscription;
  filteredPages='';
  language=''



  pageType!:any

  constructor(
    private modalService: ModalService,
    private canvasServices: OffcanvasService,
    private route: ActivatedRoute,
    private pageServices:StaticpagesService,
    private fb: FormBuilder,
    private optionSetService :OptionsetService,
    private optionSetItemsService :OptionSetItemsService

  ) {
    this.staticPagesForm=this.fb.group({
      value:[null,Validators.required],
      name:[null,Validators.required],
      valueEn:[null,Validators.required],
      pageTypeId:[null,Validators.required],
      id:[0]
    })

    this.optionSetIdContorl = new FormControl(null,Validators.required)

  }

  public get controls(): any {
    return this.staticPagesForm.controls;
  }
  ngOnInit(): void {
    this.getData();
    this.getPageTypeItems();

    this.pageSubscriber = this.pageServices.updates.subscribe((res) => {
      this.Pages = res.data;
    });

    this.optionSetItemsService.updates.subscribe((res) => {
      this.optionsetItems = res;

    });


    this.optionSetIdContorl.valueChanges.subscribe((res)=>{
      this.getAllByOptionSetId(res);
    })
  }

  getAllByOptionSetId(id:any){

    this.optionSetItemsService.getAllOptionSetItems(id).subscribe((res)=>{
      this.optionsetItems = res
      console.log(this.optionsetItems);
    })
  }

  getPageTypeItems(){

  this.optionSetService.getOPtionSetByName(`PageType`)
  .subscribe((res)=>{
    this.pageType=res;
    console.log(this.pageType.optionSetItems);

  })



  }

  getData() {

    let data: any = this.route.snapshot.data;
    this.Pages = data.initData.pages.data;
    this.optionSets = data.initData.optionsets;
    console.log(this.Pages);
    console.log(this.optionSets)

    console.log(this.optionSets[1]);
    this.pageType= this.optionSets[1].optionSetItems;
    console.log(this.pageType)

    // let data: Pagination<staticPages> = this.route.snapshot.data['initData'];
    // this.Pages = data.data;
    // this.total = data.totalCount;

    // console.log(this.optionSetIdContorl)
    // this.pageServices.updates.subscribe((res) => {
    //   this.Pages = res.data;
    //   console.log(res.data);
    //   this.total = data.totalCount;
    // });
    if (this.language == 'fromAtoZ') {
      var x = [];
      var y = [];

      const regex = /^[A-Z a-z]/;
      for (let i = 0; i < this.Pages.length; i++) {
        if (this.Pages[i].name.match(regex)) {
          x.push(this.Pages[i]);
        } 
      }
      this.Pages = [...x.sort()];
      x.sort((a, b) => (a.name < b.name ? -1 : 1));
     
      this.Pages = [...x];
    } else if (this.language == 'fromZtoA') {
      var x = [];
      var y = [];

      const regex =/^[A-Z a-z]/;
      for (let i = 0; i < this.Pages.length; i++) {
        if (this.Pages[i].name.match(regex)) {
          x.push(this.Pages[i]);
        } 
      }
      this.Pages = [...x.sort()];
      x.sort((b, a) => (a.name < b.name ? -1 : 1));
     
      this.Pages = [...x];
    }

  }
  getPages() {
    this.pageServices.getAllPages(this.pageNumber, this.pageSize);
  }

  onPageSizeChange(number: any) {
    this.pageSize = +number.target.value;
    this.getPages();
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

  onEditMode(page: staticPages) {
    this.selectedPage = page;
    this.staticPagesForm.patchValue(page);
    this.openCanvas(this.canvasID);

  }
  onDelete() {
    this.pageServices.delete(this.selectedPage?.id);
    this.selectedPage = null;
    this.closeModal(this.modalID);
    this.getData();
  }

  onSubmit() {
    if (this.staticPagesForm.invalid) return;
    let modal = this.staticPagesForm.value;
    if(!this.selectedPage){
      delete modal.id;

      this.pageServices.createPage(modal)
      this.getData();

    }else{
      this.pageServices.update(modal);

    }

      this.closeCanvas(this.canvasID);
  }

  fromZtoA()
  {
    this.language="fromZtoA"
    this.getData()
  }
  fromAtoZ(){
    this.language="fromAtoZ"
    this.getData()
  }
  clear(){
    let data: any = this.route.snapshot.data;
    this.Pages = data.initData.pages.data;
  }

}
