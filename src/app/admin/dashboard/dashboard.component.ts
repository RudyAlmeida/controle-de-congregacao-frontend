import { CongregationService } from './../../services/congregation.service';
import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig, MessageService, ConfirmationService } from 'primeng/api';
import { SuperUser, User } from 'src/app/interfaces/interfaces';
import { SuperuserService } from 'src/app/services/superuser.service';
import { UsersService } from 'src/app/services/users.service';
import { JwtHelperService } from '@auth0/angular-jwt';


@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  memberDialog!: boolean;

  anciaoDialog!: boolean

  members!: User[];

  member!: User;

  selectedmembers!: User[]

  submitted!: boolean;

  superUserDialog!: boolean;

  statuses!: any[];

  superUser!: SuperUser

  user!: User
  roles: any[] = [
    {name: "Ancião", value: "anciao"},
    {name: "Servo Ministerial", value: "servo"},
    {name: "Publicador", value: "publicador"}
  ]

  congregationName: String = ''
  constructor(private jwtHelper: JwtHelperService, private primengConfig: PrimeNGConfig, private messageService: MessageService, private superService: SuperuserService, private congregationService: CongregationService, private confirmationService: ConfirmationService, private userService: UsersService) { }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.user = this.jwtHelper.decodeToken(<any>localStorage.getItem('jwt-token'))
    this.congregationName = this.user.congregationName
    this.userService.getUserByCongregation(this.user.congregationId).subscribe((res:any) => {
      if(res.status == 200){
        console.log(res)
        this.members = res.body
      }
    })
  }
  openNew() {
    this.member = {} as User;
    this.member.congregationId = this.user.congregationId;
    this.member.congregationName = this.user.congregationName
    this.submitted = false;
    this.memberDialog = true;
}
openSuperUser() {
  this.superUser = {} as SuperUser;
  this.superUserDialog = true;
}
hideSuperUser() {
  this.superUserDialog = false;
}
deleteSelectedmembers() {
    this.confirmationService.confirm({
        message: 'Are you sure you want to delete the selected members?',
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.members = this.members.filter(val => !this.selectedmembers.includes(val));
            this.selectedmembers = null as any;
            this.messageService.add({severity:'success', summary: 'Successful', detail: 'members Deleted', life: 3000});
        }
    });
}

editmember(member: User) {
    this.member = {...member};
    this.memberDialog = true;
}

deletemember(member: User) {
    this.confirmationService.confirm({
        message: 'Tem certeza que deseja deletar a congregação: ' + member.name + '?',
        header: 'Confirmar',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.userService.deleteUser(member).subscribe((res: { status: number; }) => {
            if(res.status == 200){
              this.messageService.add({severity:'success', summary: 'Successful', detail: 'Congregação deletada com sucesso', life: 3000})
            } else {
              this.messageService.add({severity:'error', summary: 'Fail', detail: 'Erro ao deletar congregação', life: 3000});
            }
            this.ngOnInit();
            this.member = {} as User;
          })
        }
    });
}

hideDialog() {
    this.memberDialog = false;
    this.submitted = false;
}

savemember() {
    this.submitted = true;

    if (this.member.name.trim()) {
        if (this.member._id) {
          this.userService.updateUser(this.member).subscribe(res => {
            if(res.status == 200){
              this.messageService.add({severity:'success', summary: 'Successful', detail: 'Congregação atualizada com sucesso', life: 3000})
            } else {
              this.messageService.add({severity:'error', summary: 'Fail', detail: 'Erro ao atualizar congregação', life: 3000});
            }
            this.ngOnInit();
          })
        }
        else {
            this.userService.addUser(this.member).subscribe( res => {
              if(res.status == 201){
                this.messageService.add({severity:'success', summary: 'Successful', detail: 'Congregação adicionada.', life: 3000})
              } else {
                this.messageService.add({severity:'error', summary: 'Fail', detail: 'Falha ao adicionar congregação', life: 3000});
              }
              this.ngOnInit();
            })
        }
        this.members = [...this.members];
        this.memberDialog = false;
        this.member = {} as User;
    }
}

addAnciao(){
  this.member.congregationId = ''
  this.member.congregationName = this.member.name
  this.userService.addUser(this.member).subscribe(res => {
    if(res.status == 201){
      this.messageService.add({severity:'success', summary: 'Successful', detail: 'Usuario adicionado.', life: 3000})
    } else {
      this.messageService.add({severity:'error', summary: 'Fail', detail: 'Falha ao adicionar usuario', life: 3000});
    }
    this.ngOnInit();
  })
  this.anciaoDialog = false
  this.member = {} as User
  this.member = {} as User;
}
openAnciao(member: User) {
  this.member = {...member};
  this.member = {} as User
  this.anciaoDialog = true;
}
hideAnciaoDialog() {
  this.anciaoDialog = false;
  this.submitted = false;
}

findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.members.length; i++) {
        if (this.members[i]._id === id) {
            index = i;
            break;
        }
    }

    return index;
}

addSuperUser(){
  this.superUser.role = 'superUser'
  this.superService.addSuperUser(this.superUser).subscribe(res => {
    if(res.status == 201){
      this.messageService.add({severity:'success', summary: 'Successful', detail: 'Super usuario adicionado.', life: 3000})
    } else {
      this.messageService.add({severity:'error', summary: 'Fail', detail: 'Falha ao adicionar Super usuario', life: 3000});
    }
  })

}

}
