import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Product {
  name: string;
  quantity: number | string;
}

@Component({
  selector: 'app-product-grids',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.css']
})


export class ProductTableComponent {

  productList: string[] = ['Board','pencil', 'Eraser', 'Bottle','Duster', 'Pen','Tiffin' , 'Sharpner','Book', 'Paper', 'Box', 'Bag','Umbrella','compass','laptop', 'computer'];
  quantityList: number[] = [1, 2, 3, 4, 5];
  products: Product[] = [{ name: '', quantity: '' }];
  tempOrder: Product[] = [];
  maxSelected: number = 8;
  quantityError: boolean[] = [];

  @Output() orderUpdated = new EventEmitter<Product[]>();


  onProductChange(index: number) {
    if (this.products[index].name && !this.products[index + 1]) {
      this.products.push({ name: '', quantity: '' });
    }
    this.products[index].quantity = '';
  }

  onQuantityChange(index: number) {

    if (this.products[index].quantity !== '') {
      this.quantityError[index] = false;
    }
    if (this.products[index].quantity && !this.products[index + 1]) {
      this.products.push({ name: '', quantity: '' });
    }
  }

  addProduct(index: number) {

    const selectedProduct = this.products[index];
    const existingProduct = this.tempOrder.findIndex(p => p.name === selectedProduct.name);

    if (existingProduct !== -1) {
      this.tempOrder[existingProduct].quantity = selectedProduct.quantity;
    }

    else {
      if (this.products[index].name && this.products[index].quantity != '') {
        if (this.tempOrder.length < this.maxSelected) {
          this.tempOrder.push({ ...this.products[index] });
          alert("Product added succesfully");
        } else {
          alert("You can select  maximum of 8 products.")
        }
      } else {
        if (!this.products[index].quantity) {
          this.quantityError[index] = true;
        }
      }
    }
  }

  showOrder() {
    this.orderUpdated.emit(this.tempOrder);

  }

  isProductSelected(product: string): boolean {
    return this.products.some(p => p.name === product);
  }

}
