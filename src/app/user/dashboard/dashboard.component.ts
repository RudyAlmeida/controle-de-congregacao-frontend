import { UsersService } from 'src/app/services/users.service';
import { Registry, User } from './../../interfaces/interfaces';
import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';
import { JwtHelperService } from '@auth0/angular-jwt';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [MessageService,ConfirmationService]
})
export class DashboardComponent implements OnInit {
  relatoryDialog!: boolean;

  relatorys!: any[];

  relatory: any = {}

  selectedRelatorys!: any[]

  submitted!: boolean;

  statuses!: any[];

  calendarDate!: Date;
  maxDateValue!: Date;
  minDateValue!: Date;

  totalHours: any = {};
  user!: User

  registries: any = {}
  monthAndYear: Date = new Date()
  today: Date = new Date()
  constructor(private jwtHelper: JwtHelperService, private userService: UsersService, private primengConfig: PrimeNGConfig, private messageService: MessageService, private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.user = this.jwtHelper.decodeToken(<any>localStorage.getItem('jwt-token'))
    this.maxDateValue =  new Date()
    this.primengConfig.ripple = true;
    let today = new Date();
    this.userService.getOneUser(this.user).subscribe((res: any) => {
      this.relatorys = res.body[today.getFullYear()][today.getMonth()].registries
      this.totalHours = {...res.body[today.getFullYear()][today.getMonth()].totals}
      console.log(this.totalHours)
    })
    this.minDateValue = new Date(`${today.getFullYear() -1 }/${today.getMonth()}/1`)
      this.relatorys.forEach(e => {
      this.totalHours += Number(e.hours)
    })
  }
  openNew() {
    this.relatory = {} as Registry;
    this.submitted = false;
    this.relatoryDialog = true;
}

deleteSelectedrelatorys() {
  console.log(this.selectedRelatorys)
  console.log(this.monthAndYear)
    // this.confirmationService.confirm({
    //     message: 'Are you sure you want to delete the selected relatorys?',
    //     header: 'Confirm',
    //     icon: 'pi pi-exclamation-triangle',
    //     accept: () => {
    //         this.relatorys = this.relatorys.filter(val => !this.selectedRelatorys.includes(val));
    //         this.selectedRelatorys = null as any;
    //         this.messageService.add({severity:'success', summary: 'Successful', detail: 'relatorys Deleted', life: 3000});
    //     }
    // });
}

editrelatory(relatory: any) {
    this.relatory = {...relatory};
    this.relatoryDialog = true;
}

deleterelatory(relatory: any) {
    this.confirmationService.confirm({
        message: 'Are you sure you want to delete ' + relatory.name + '?',
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.relatorys = this.relatorys.filter(val => val.id !== relatory.id);
            this.relatory = {} as Registry;
            this.messageService.add({severity:'success', summary: 'Successful', detail: 'relatory Deleted', life: 3000});
        }
    });
}

hideDialog() {
    this.relatoryDialog = false;
    this.submitted = false;
}

saveRelatory() {
    this.submitted = true;
    let today = new Date()
    this.relatory.userId = this.user._id
    this.relatory.reported = false
    this.relatory.year = this.calendarDate.getFullYear().toString()
    this.relatory.month = this.calendarDate.getMonth().toString()
    this.relatory.day = this.calendarDate.getDate().toString()

    console.log(this.relatory)

    this.userService.addRegistry(this.relatory).subscribe( res => {
      if(res.status == 200){
        this.messageService.add({severity:'success', summary: 'Successful', detail: 'Relatorio Adicionado', life: 3000})
      } else {
        this.messageService.add({severity:'error', summary: 'Fail', detail: 'Falha ao adicionar relatorio', life: 3000});
      }
      this.ngOnInit();
      this.relatoryDialog = false
    })

    // if (this.relatory.name.trim()) {
    //     if (this.relatory.id) {
    //         this.relatorys[this.findIndexById(this.relatory.id)] = this.relatory;
    //         this.messageService.add({severity:'success', summary: 'Successful', detail: 'relatory Updated', life: 3000});
    //     }
    //     else {
    //         this.relatory.id = this.createId();
    //         this.relatory.image = 'relatory-placeholder.svg';
    //         this.relatorys.push(this.relatory);
    //         this.messageService.add({severity:'success', summary: 'Successful', detail: 'relatory Created', life: 3000});
    //     }

    //     this.relatorys = [...this.relatorys];
    //     this.relatoryDialog = false;
    //     this.relatory = {};
    // }
}

findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.relatorys.length; i++) {
        if (this.relatorys[i].id === id) {
            index = i;
            break;
        }
    }

    return index;
}

createId(): string {
    let id = '';
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for ( var i = 0; i < 5; i++ ) {
        id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
}

}
