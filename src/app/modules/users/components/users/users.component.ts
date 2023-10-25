import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserInfo } from 'src/app/modules/auth/models/user-info';
import { ModalService } from 'src/app/modules/core/services/modal.service';
import { OffcanvasService } from 'src/app/modules/core/services/offcanvas.service';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  modalID = 'delete-Area';
  pageNumber = 1;
  pageSize = 5;
  total!: number;
  filter: string = '';
  sizes = [5, 10, 20, 30];
  users: UserInfo[] = [];
  userId: string = '';
  searchKey = '';
  active: string = '';
  language: string = '';
  superAdmin : string ='';
  canvasID = 'UserManagementDetails';
  userDetails: any;
  typingTimer!: any; //timer identifier
  doneTypingInterval = 500;
  key!: any;
  constructor(
    private modalService: ModalService,
    private canvasServices: OffcanvasService,
    private route: ActivatedRoute,
    private userServices: UsersService,
    public _canvas: OffcanvasService
  ) {}

  ngOnInit() {
    this.getData();
  }

  getData() {
    // let data: any = this.route.snapshot.data;
    // this.users = data.users.data;
    // this.total = data.users.totalCount;
    // this.userServices.updates.subscribe((res) => {
    //   console.log(res);

    //   this.total = res.totalCount;
    //   this.users = res.data;
    // });
    this.getUsers();
  }
  onPageSizeChange(number: any) {
    this.pageSize = +number.target.value;

    this.getUsers();
  }

  onPageChange(event: number) {
    this.pageNumber = event;

    this.getUsers();
  }

  getUsers() {
    
    if (this.filter == 'active') {
      this.filterActive();
    } else if (this.filter == 'deactive') {
      this.filterDeActive();
    } else if (this.filter == 'admin') {
      this.filterAdmin();
    } else if (this.filter == 'superAdmin') {
      this.filterSuperAdmin();
    } else {
      this.getAll();
    }
    // if (this.superAdmin == 'true') {
    //   let all = this.users.filter((element: UserInfo) => {
    //     return element.isTakidSuperAdmin;
    //   });
    //   this.users = all;
    // } else if (this.superAdmin == 'false') {
    //   let all = this.users.filter((element: UserInfo) => {
    //     return !element.isTakidSuperAdmin;
    //   });
    //   this.users = all;
    // } else {
    //   this.users;
    // }
    // if (this.active == '') {
    //   this.users;
    // } else if (this.active == 'active') {
    //   let all = this.users.filter((element: UserInfo) => {
    //     return element.isActive;
    //   });
    //   this.users = all;
    // } else {
    //   let all = this.users.filter((element: UserInfo) => {
    //     return !element.isActive;
    //   });
    //   this.users = all;

    // }
  }
  getAll() {
    this.userServices
      .getAll(this.pageNumber, this.pageSize)
      .subscribe((res) => {
        this.users = res.data;
        this.total = res.totalCount;
        
        if(this.superAdmin == 'true'){
          let all =this.users.filter((element:UserInfo) =>{
            return element.isTakidSuperAdmin;
          });
          this.users = all;
        }else if (this.superAdmin == 'false'){
          let all =this.users.filter((element:UserInfo) =>{
            return !element.isTakidSuperAdmin; 
          });
          this.users = all;
        }else{
          this.users;
        }
        if (this.active == '') {
          this.users;
        } else if (this.active == 'active') {
          let all = this.users.filter((element: UserInfo) => {
            return element.isActive;
          });
          this.users = all;
        } else if(this.active == 'deactive') {
          let all = this.users.filter((element: UserInfo) => {
            return !element.isActive;
          });
          this.users = all;
          console.log(this.users);
        }
        if (this.language == 'english') {
          var x = [];
          var y = [];

          const regex = /^[A-Za-z]/;
          for (let i = 0; i < this.users.length; i++) {
            if (this.users[i].firstName.match(regex)) {
              x.push(this.users[i]);
            } else {
              y.push(this.users[i]);
            }
          }
          this.users = [...x.sort(), ...y.sort()];
          x.sort((a, b) => (a.firstName < b.firstName ? -1 : 1));
          y.sort((a, b) => (a.firstName < b.firstName ? -1 : 1));
          this.users = [...x, ...y];
        } else if (this.language == 'arabic') {
          var x = [];
          var y = [];

          const regex = /^[ء-ي]/;
          for (let i = 0; i < this.users.length; i++) {
            if (this.users[i].firstName.match(regex)) {
              x.push(this.users[i]);
            } else {
              y.push(this.users[i]);
            }
          }
          this.users = [...x.sort(), ...y.sort()];
          x.sort((a, b) => (a.firstName < b.firstName ? -1 : 1));
          y.sort((a, b) => (a.firstName < b.firstName ? -1 : 1));
          this.users = [...x, ...y];
        }
      });
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

  toggleState(user: UserInfo, event: any) {
    if (event.checked) {
      this.userServices.active(user);
    } else {
      this.userServices.deActive(user);
    }
  }

  toggleAdmin(user: UserInfo, event: any) {
    console.log(user);
    console.log(event);
  }
  onDelete() {
    this.userServices.delete(this.userId).subscribe((res) => {
      console.log(res);

      if (res) {
        this.userId = '';
        this.getUsers();
        this.closeModal(this.modalID);
      }
    });
  }
  filterActive() {
    this.filter = 'active';
    this.userServices
      .getAllActive(this.pageNumber, this.pageSize)
      .subscribe((res) => {
        this.users = res.data;
        this.total = res.totalCount;
      
      });
  }
  filterDeActive() {
    this.filter = 'deactive';
    this.userServices
      .getAllNotActive(this.pageNumber, this.pageSize)
      .subscribe((res) => {
        this.users = res.data;
        this.total = res.totalCount;
      
      });
  }
  // english() {
  //   this.language = 'english';
  //   this.getUsers();
  // }
  // arabic() {
  //   this.language = 'arabic';
  //   this.getUsers();
  // }
  filterAdmin() {
    this.filter = 'admin';
    this.userServices
      .getAllAdmin(this.pageNumber, this.pageSize)
      .subscribe((res) => {
        this.users = res.data;
        this.total = res.totalCount;
        // if (this.language == 'english') {
        //   var x = [];
        //   var y = [];
        //   const regex = /^[A-Z a-z]/;
        //   for (let i = 0; i < this.users.length; i++) {
        //     if (this.users[i].firstName.match(regex)) {
        //       x.push(this.users[i]);
        //     } else {
        //       y.push(this.users[i]);
        //     }
        //   }
        //   this.users = [...x.sort(), ...y.sort()];
        //   x.sort((a, b) => (a.firstName < b.firstName ? -1 : 1));
        //   y.sort((a, b) => (a.firstName < b.firstName ? -1 : 1));
        //   this.users = [...x, ...y];
        // } else if (this.language == 'arabic') {
        //   var x = [];
        //   var y = [];
        //   const regex = /^[ء-ي]/;
        //   for (let i = 0; i < this.users.length; i++) {
        //     if (this.users[i].firstName.match(regex)) {
        //       x.push(this.users[i]);
        //     } else {
        //       y.push(this.users[i]);
        //     }
        //   }
        //   this.users = [...x.sort(), ...y.sort()];
        //   x.sort((a, b) => (a.firstName < b.firstName ? -1 : 1));
        //   y.sort((a, b) => (a.firstName < b.firstName ? -1 : 1));
        //   this.users = [...x, ...y];
        // }
      });
  }
  filterSuperAdmin() {
    this.filter = 'superAdmin';
    this.userServices
      .getAllSuperAdmin(this.pageNumber, this.pageSize)
      .subscribe((res) => {
        this.users = res.data;
        this.total = res.totalCount;
        // if (this.language == 'english') {
        //   var x = [];
        //   var y = [];
        //   const regex = /^[A-Z a-z]/;
        //   for (let i = 0; i < this.users.length; i++) {
        //     if (this.users[i].firstName.match(regex)) {
        //       x.push(this.users[i]);
        //     } else {
        //       y.push(this.users[i]);
        //     }
        //   }
        //   this.users = [...x.sort(), ...y.sort()];
        //   x.sort((a, b) => (a.firstName < b.firstName ? -1 : 1));
        //   y.sort((a, b) => (a.firstName < b.firstName ? -1 : 1));
        //   this.users = [...x, ...y];
        // } else if (this.language == 'arabic') {
        //   var x = [];
        //   var y = [];
        //   const regex = /^[ء-ي]/;
        //   for (let i = 0; i < this.users.length; i++) {
        //     if (this.users[i].firstName.match(regex)) {
        //       x.push(this.users[i]);
        //     } else {
        //       y.push(this.users[i]);
        //     }
        //   }
        //   this.users = [...x.sort(), ...y.sort()];
        //   x.sort((a, b) => (a.firstName < b.firstName ? -1 : 1));
        //   y.sort((a, b) => (a.firstName < b.firstName ? -1 : 1));
        //   this.users = [...x, ...y];
        // }
      });
  }
  clear() {
    this.filter = ' ';
    this.getUsers();
  }
  Details(user: UserInfo) {
    this.userDetails = user;
    this._canvas.open(this.canvasID);
  }
  stopEvent(event: any) {
    event.stopImmediatePropagation();
  }


  keyupFunction(event: any) {
    this.key = event.target.value;
    console.log(this.key);
    clearTimeout(this.typingTimer);
    this.typingTimer = setTimeout(() => {
      this.doneTyping(this.key);
    }, this.doneTypingInterval);
  }

  keydownfunction() {
    clearTimeout(this.typingTimer);
    console.log(this.typingTimer);
  }

  doneTyping(key: string) {
    console.log(key);
    if (this.key == '') {
      this.getUsers();
    } else {
      this.userServices
        .search(this.key, this.pageNumber, this.pageSize)
        .subscribe((res: any) => {
          console.log(res);
          this.users = res.data;
          this.total = res.totalCount;
          console.log(this.total);
        });
    }
  }
}
