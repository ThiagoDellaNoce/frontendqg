import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { CookieService } from 'ngx-cookie';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {

  comandas;

  baseUrl;
  headers;

  data;

  constructor(private http: HttpClient, private router: Router, private _cookieService: CookieService) {
    this.baseUrl = 'https://backendqg.herokuapp.com/';

    this.headers = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'});
   }

  ngOnInit() {

    if (this.getCookie() != null) {
      this.getComandas();
    } else {
      this.router.navigate(['/login']);
    }

    App.filter('strReplace', function () {
      return function (input, from, to) {
        input = input || '';
        from = from || '';
        to = to || '';
        return input.replace(new RegExp(from, 'g'), to);
      };
    });
   }

  // chama serviço READ
  getComandas() {
    this.http.get(this.baseUrl + 'comanda/', {headers: this.headers})
    .subscribe(
      res => {
        this.comandas = res;
      },
      err => {
        console.log(err);
      }
    );
  }

  // chama serviço DELETE
  deleteComanda(id) {
    if (confirm('Tem certeza que deseja deletar a comanda?')) {
      this.http.get(this.baseUrl + 'comanda/delete/' + id, {headers: this.headers})
      .subscribe(
        res => {
          window.location.reload();
        },
        err => {
          console.log(err);
        }
      );
    }

  }

  getCookie() {
    return this._cookieService.get('token');
  }
}

