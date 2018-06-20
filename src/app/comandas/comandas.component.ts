import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { CookieService } from 'ngx-cookie';

@Component({
  selector: 'app-comandas',
  templateUrl: './comandas.component.html',
  styleUrls: ['./comandas.component.css']
})
export class ComandasComponent implements OnInit {

  registros;

  baseUrl;
  headers;

  data;

  constructor(private http: HttpClient, private router: Router, private _cookieService: CookieService) {
    this.baseUrl = 'https://backendqg.herokuapp.com/';

    this.headers = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'});
   }

  ngOnInit() {

    if (this.getCookie() != null) {
      this.getRegistros();
    } else {
      this.router.navigate(['/login']);
    }
   }

  // chama serviço READ
  getRegistros() {
    this.http.get(this.baseUrl + 'registro/', {headers: this.headers})
    .subscribe(
      res => {
        this.registros = res;
      },
      err => {
        console.log(err);
      }
    );
  }

  // chama serviço DELETE
  deleteRegistro(id) {
    this.http.get(this.baseUrl + 'registro/delete/' + id, {headers: this.headers})
    .subscribe(
      res => {
        alert(res);
        this.router.navigate(['/comandas']);
      },
      err => {
        console.log(err);
      }
    );
  }

  getCookie() {
    return this._cookieService.get('token');
  }
}

