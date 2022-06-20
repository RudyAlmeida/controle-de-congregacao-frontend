import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [MessageService,ConfirmationService]
})
export class DashboardComponent implements OnInit {
  productDialog!: boolean;

  products!: any[];

  product: any;

  selectedProducts!: any[]

  submitted!: boolean;

  statuses!: any[];

  totalHours: number = 0;
  constructor(private primengConfig: PrimeNGConfig, private messageService: MessageService, private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.statuses = [
        {label: 'INSTOCK', value: 'instock'},
        {label: 'LOWSTOCK', value: 'lowstock'},
        {label: 'OUTOFSTOCK', value: 'outofstock'}
    ];

    this.products = [
      {
        id: '1', day: '1', publications: '2', videos: '3', hours: '5', revisiting: '1', studies: '1'
      },
      {
        id: '2', day: '3', publications: '2', videos: '3', hours: '5', revisiting: '1', studies: '1'
      },
      {
        id: '3', day: '5', publications: '2', videos: '3', hours: '5', revisiting: '1', studies: '1'
      },
      {
        id: '4', day: '8', publications: '2', videos: '3', hours: '5', revisiting: '1', studies: '1'
      },
      {
        id: '5', day: '10', publications: '2', videos: '3', hours: '5', revisiting: '1', studies: '1'
      },
      {
        id: '6', day: '13', publications: '2', videos: '3', hours: '5', revisiting: '1', studies: '1'
      },
      {
        id: '7', day: '15', publications: '2', videos: '3', hours: '5', revisiting: '1', studies: '1'
      },
      {
        id: '8', day: '18', publications: '2', videos: '3', hours: '7', revisiting: '1', studies: '1'
      },
      {
        id: '9', day: '20', publications: '2', videos: '3', hours: '5', revisiting: '1', studies: '1'
      },
      {
        id: '10', day: '21', publications: '2', videos: '3', hours: '5', revisiting: '1', studies: '1'
      },
      {
        id: '11', day: '23', publications: '2', videos: '3', hours: '5', revisiting: '1', studies: '1'
      }
    ]

    this.products.forEach(e => {
      this.totalHours += Number(e.hours)
    })
  }
  openNew() {
    this.product = {};
    this.submitted = false;
    this.productDialog = true;
}

deleteSelectedProducts() {
    this.confirmationService.confirm({
        message: 'Are you sure you want to delete the selected products?',
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.products = this.products.filter(val => !this.selectedProducts.includes(val));
            this.selectedProducts = null as any;
            this.messageService.add({severity:'success', summary: 'Successful', detail: 'Products Deleted', life: 3000});
        }
    });
}

editProduct(product: any) {
    this.product = {...product};
    this.productDialog = true;
}

deleteProduct(product: any) {
    this.confirmationService.confirm({
        message: 'Are you sure you want to delete ' + product.name + '?',
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.products = this.products.filter(val => val.id !== product.id);
            this.product = {};
            this.messageService.add({severity:'success', summary: 'Successful', detail: 'Product Deleted', life: 3000});
        }
    });
}

hideDialog() {
    this.productDialog = false;
    this.submitted = false;
}

saveProduct() {
    this.submitted = true;

    if (this.product.name.trim()) {
        if (this.product.id) {
            this.products[this.findIndexById(this.product.id)] = this.product;
            this.messageService.add({severity:'success', summary: 'Successful', detail: 'Product Updated', life: 3000});
        }
        else {
            this.product.id = this.createId();
            this.product.image = 'product-placeholder.svg';
            this.products.push(this.product);
            this.messageService.add({severity:'success', summary: 'Successful', detail: 'Product Created', life: 3000});
        }

        this.products = [...this.products];
        this.productDialog = false;
        this.product = {};
    }
}

findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.products.length; i++) {
        if (this.products[i].id === id) {
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
