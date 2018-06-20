import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-visao-geral',
  templateUrl: './visao-geral.component.html',
  styleUrls: ['./visao-geral.component.css']
})
export class VisaoGeralComponent implements OnInit {
  baseUrl;
  data;
  latlng: any;
  title = 'Trackage - Serviço indisponível';
  lat = -19.7432795;
  lng = -47.9317056;
  dados: any;

  endereco;
  enderecos;
  devices;

  map;
  marker;

  constructor(private http: HttpClient) {
    this.baseUrl = 'https://bags-api.azurewebsites.net/';

    setInterval(() => {
      this.ngOnInit();
    }, 60000 );
  }

  ngOnInit() {
    const headers = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'});
    this.http.post(this.baseUrl + 'users/status', { imei: '353612089186600' }, {headers: headers})
    .subscribe(
      res => {
        this.data = res;
        console.log(this.data);
        this.lat = this.data.lat;
        this.lng = this.data.lon;
        this.title = this.data.creation +  ' --- ' + this.data.baterry + '%';
      },
      err => {
        console.log(err);
      }
    );

  }

}
