import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-multi-selector-dropdown',
  templateUrl: './multi-selector-dropdown.component.html',
  styleUrls: ['./multi-selector-dropdown.component.scss']
})
export class MultiSelectorDropdownComponent implements OnInit {

  @Input()
  list!: any[]; 
    
  @Output() shareCheckedList = new EventEmitter();
  @Output() shareIndividualCheckedList = new EventEmitter();
  
  showDropDown!:boolean;
  checkedList : any[];
  currentSelected : any;
  
  constructor(){
      this.checkedList = [];
  }
  getSelectedValue(status:Boolean,value:String){
      if(status){
        this.checkedList.push(value);  
      }else{
          var index = this.checkedList.indexOf(value);
          this.checkedList.splice(index,1);
      }
      
      this.currentSelected = {checked : status,name:value};

      //share checked list
      this.shareCheckedlist();
      
      //share individual selected item
      this.shareIndividualStatus();
  }
  shareCheckedlist(){
       this.shareCheckedList.emit(this.checkedList);
  }
  shareIndividualStatus(){
      this.shareIndividualCheckedList.emit(this.currentSelected);
  }


  ngOnInit(): void {
  }

}
