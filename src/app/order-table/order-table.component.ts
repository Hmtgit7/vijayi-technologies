import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input } from '@angular/core';


interface Product {
  name: string;
  quantity: number | string;
}


@Component({
  selector: 'app-order-grids',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-table.component.html',
  styleUrls: ['./order-table.component.css']
})

export class OrderTableComponent {

  @Input() order: Product[] = [];

  constructor(private http: HttpClient) { }



  readOrder() {

    const orderText = this.order.map((product, index) => `Row ${index + 1}: Product Name ${product.name} - Quantity ${product.quantity}`).join(',');
    const apiUrl = 'https://voicerss-text-to-speech.p.rapidapi.com/';
    const apiKey = 'f8dc5cff34b54ba8b293c6999a5375af';

    const headers = new HttpHeaders({
      'x-rapidapi-host': 'voicerss-text-to-speech.p.rapidapi.com',
      'x-rapidapi-key': 'cd0b0c5fbemsh766be7e99b919e8p192e22jsn37be0e838ac8'
    });

    const formData = new FormData();
    formData.append('key', apiKey);
    formData.append('src', orderText);
    formData.append('hl', 'en-us');
    formData.append('r', '0');
    formData.append('c', 'mp3');
    formData.append('f', '8khz_8bit_mono');

    this.http.post(apiUrl, formData, { headers, responseType: 'blob' })
      .subscribe((response: Blob) => {
        const audioUrl = URL.createObjectURL(response);
        const audio = new Audio(audioUrl);
        audio.play();
      }, error => {
        console.error('Error occurred', error);
      });
  }

}

