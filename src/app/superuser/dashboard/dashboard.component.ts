import { UsersService } from './../../services/users.service';
import { CongregationService } from './../../services/congregation.service';
import { SuperuserService } from 'src/app/services/superuser.service';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { Congregation, User } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-superuser-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class SuperUserDashboardComponent implements OnInit {
  congregationDialog!: boolean;

  anciaoDialog!: boolean

  congregations!: Congregation[];

  congregation!: Congregation;

  selectedCongregations!: Congregation[]

  submitted!: boolean;

  statuses!: any[];

  user!: User
  roles: any[] = [
    {name: "Ancião", value: "anciao"},
    {name: "Servo Ministerial", value: "servo"},
    {name: "Publicador", value: "publicador"}
  ]
  constructor(private primengConfig: PrimeNGConfig, private messageService: MessageService, private superService: SuperuserService, private congregationService: CongregationService, private confirmationService: ConfirmationService, private userService: UsersService) { }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.congregationService.getAllCongregations().subscribe(res =>{
      this.congregations = res as Congregation[]
    })
  }
  openNew() {
    this.congregation = {} as Congregation;
    this.submitted = false;
    this.congregationDialog = true;
}

deleteSelectedcongregations() {
    this.confirmationService.confirm({
        message: 'Are you sure you want to delete the selected congregations?',
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.congregations = this.congregations.filter(val => !this.selectedCongregations.includes(val));
            this.selectedCongregations = null as any;
            this.messageService.add({severity:'success', summary: 'Successful', detail: 'congregations Deleted', life: 3000});
        }
    });
}

editcongregation(congregation: Congregation) {
    this.congregation = {...congregation};
    this.congregationDialog = true;
}

deletecongregation(congregation: Congregation) {
    this.confirmationService.confirm({
        message: 'Tem certeza que deseja deletar a congregação: ' + congregation.name + '?',
        header: 'Confirmar',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.congregationService.deleteCongregation(congregation).subscribe(res => {
            if(res.status == 200){
              this.messageService.add({severity:'success', summary: 'Successful', detail: 'Congregação deletada com sucesso', life: 3000})
            } else {
              this.messageService.add({severity:'error', summary: 'Fail', detail: 'Erro ao deletar congregação', life: 3000});
            }
            this.ngOnInit();
            this.congregation = {} as Congregation;
            this.messageService.add({severity:'success', summary: 'Successful', detail: 'congregation Deleted', life: 3000});
          })

        }
    });
}

hideDialog() {
    this.congregationDialog = false;
    this.submitted = false;
}

savecongregation() {
    this.submitted = true;

    if (this.congregation.name.trim()) {
        if (this.congregation._id) {
          this.congregationService.updateCongregation(this.congregation).subscribe(res => {
            if(res.status == 200){
              this.messageService.add({severity:'success', summary: 'Successful', detail: 'Congregação atualizada com sucesso', life: 3000})
            } else {
              this.messageService.add({severity:'error', summary: 'Fail', detail: 'Erro ao atualizar congregação', life: 3000});
            }
            this.ngOnInit();
          })
        }
        else {
            this.congregationService.saveCongregation(this.congregation).subscribe( res => {
              if(res.status == 201){
                this.messageService.add({severity:'success', summary: 'Successful', detail: 'Congregação adicionada.', life: 3000})
              } else {
                this.messageService.add({severity:'error', summary: 'Fail', detail: 'Falha ao adicionar congregação', life: 3000});
              }
              this.ngOnInit();
            })
        }
        this.congregations = [...this.congregations];
        this.congregationDialog = false;
        this.congregation = {} as Congregation;
    }
}

addAnciao(){
  this.user.congregationId = this.congregation._id
  this.user.congregationName = this.congregation.name
  this.userService.addUser(this.user).subscribe(res => {
    if(res.status == 201){
      this.messageService.add({severity:'success', summary: 'Successful', detail: 'Usuario adicionado.', life: 3000})
    } else {
      this.messageService.add({severity:'error', summary: 'Fail', detail: 'Falha ao adicionar usuario', life: 3000});
    }
    this.ngOnInit();
  })
  this.anciaoDialog = false
  this.user = {} as User
}
openAnciao(congregation: Congregation) {
  this.congregation = {...congregation};
  this.user = {} as User
  this.anciaoDialog = true;
}
hideAnciaoDialog() {
  this.anciaoDialog = false;
  this.submitted = false;
}

findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.congregations.length; i++) {
        if (this.congregations[i]._id === id) {
            index = i;
            break;
        }
    }

    return index;
}

}
