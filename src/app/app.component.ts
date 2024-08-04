import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductTableComponent } from './product-table/product-table.component';
import { OrderTableComponent } from './order-table/order-table.component';



interface Product {
  name: string;
  quantity: number | string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,ProductTableComponent,OrderTableComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  constructor(private http: HttpClient) { }
  order: Product[] = [];

  updateOrder(order: Product[]) {
    this.order = order;
  }

}


