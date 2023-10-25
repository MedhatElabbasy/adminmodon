import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Pagination } from 'src/app/modules/core/models/pagination';
import { ModalService } from 'src/app/modules/core/services/modal.service';
import { OffcanvasService } from 'src/app/modules/core/services/offcanvas.service';
import { Settings } from '../../models/setting';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-manage-setting',
  templateUrl: './manage-setting.component.html',
  styleUrls: ['./manage-setting.component.scss']
})
export class ManageSettingComponent implements OnInit  {

  pageNumber = 1;
  pageSize = 10;
  total!: number;
  sizes = [5, 10, 20, 30];
  settings!: Settings[];
  canvasID = 'setting-canvas';
  modalID = 'delete-setting';
  settingForm!: FormGroup;
  filteredSetting=''
  language=''
  lock=''
  typingTimer!: any;                //timer identifier
  doneTypingInterval = 1000;
  key!: any;
  selectedsetting!: Settings | null;
  constructor(
    private modalService: ModalService,
    private canvasServices: OffcanvasService,
    private route: ActivatedRoute,
    private settingServices:SettingsService,
    private fb: FormBuilder,
    ) {
      this.settingForm = this.fb.group({
        key: [null, Validators.required],
        value: [null, Validators.required],
        isLocked: [false, Validators.required],
        id: [0],

     }
      )
    };

    public get controls(): any {
      return this.settingForm.controls;
    }

  ngOnInit() {
    this.getData()
  }

  getData() {
    let data: Pagination<Settings> = this.route.snapshot.data['initData'];
    this.settings = data.data;
    this.total = data.totalCount;
   console.log(this.settings);
   
    this.settingServices.updates.subscribe((res) => {
      this.settings = res.data;
      this.total = data.totalCount;
  
    });
    if (this.lock == '') {
      this.settings;
    } else if (this.lock == 'locked') {
      let all = this.settings.filter((element:Settings) => {
        return element.isLocked;
      });
      this.settings = all;
    } else {
      let all = this.settings.filter((element: Settings) => {
        return !element.isLocked;
      });
      this.settings = all;
      console.log(this.settings);
    }
      if (this.language == 'fromAtoZ') {
        var x = [];
        var y = [];
  
        const regex = /^[A-Z a-z]/;
        for (let i = 0; i < this.settings.length; i++) {
          if (this.settings[i].key.match(regex)) {
            x.push(this.settings[i]);
          } 
        }
        this.settings = [...x.sort()];
        x.sort((a, b) => (a.key < b.key ? -1 : 1));
       
        this.settings = [...x];
      } else if (this.language == 'fromZtoA') {
        var x = [];
        var y = [];
  
        const regex =/^[A-Z a-z]/;
        for (let i = 0; i < this.settings.length; i++) {
          if (this.settings[i].key.match(regex)) {
            x.push(this.settings[i]);
          } 
        }
        this.settings = [...x.sort()];
        x.sort((b, a) => (a.key < b.key ? -1 : 1));
       
        this.settings = [...x];
      }
  

   
  }

  getSettings() {
    this.settingServices.getAllSettings(this.pageNumber, this.pageSize);
  }


  onPageSizeChange(number: any) {
    this.pageSize = +number.target.value;
    this.getSettings();
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

  onEditMode(setting: Settings) {
    this.selectedsetting = setting;
    this.settingForm.patchValue(setting);
    this.openCanvas(this.canvasID);
  }
  onDelete() {

    this.settingServices.delete(this.selectedsetting?.id);
    this.selectedsetting = null;
    this.closeModal(this.modalID);
  }

  onSubmit() {
    if (this.settingForm.invalid) return;
    let modal = this.settingForm.value;
    if(!this.selectedsetting){
      delete modal.id;
      this.settingServices.createSetting(modal);

    }else{
      this.settingServices.update(modal);
    }

      this.closeCanvas(this.canvasID);
  }

  fromAtoZ(){
    this.language='fromAtoZ'
    this.getData()
  }
  fromZtoA(){
    this.language='fromZtoA'
    this.getData()
  }
  clear(){
    let data: Pagination<Settings> = this.route.snapshot.data['initData'];
    this.settings = data.data;
  }
  filterLocked() {
    this.lock = 'locked';
    this.getData();
  }
  filterUnlocked() {
    this.lock = 'unlocked';
    this.getData();
  }

  keyupFunction(event: any) {
    this.key = event.target.value;
    console.log(this.key);
     clearTimeout(this.typingTimer);
    this.typingTimer = setTimeout(() => {this.doneTyping(this.key) }, this.doneTypingInterval);
  }

  keydownfunction() {
    clearTimeout(this.typingTimer);
    console.log(this.typingTimer);
  }

  doneTyping(key:string) {
    console.log(key);
    if(this.key == ""){
      this.getSettings();
    }else{
      this.settingServices.search(this.key , this.pageNumber , this.pageSize).subscribe((res:any)=>{
        console.log(res);
        this.settings=res.data;
        this.total=res.totalCount;
        console.log(this.total);

        })
    }
  }

}
