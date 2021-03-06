import { Component, OnInit } from '@angular/core';

import { NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import { CookieService } from 'ngx-cookie';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  name: String;
  mesa: String;
  consumidos: String;

  baseUrl;
  headers;

  data;

  constructor(private http: HttpClient, private router: Router, private _cookieService: CookieService) {

    this.baseUrl = 'https://backendqg.herokuapp.com/';

    this.headers = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'});

  }

  ngOnInit() {
    if (this.getCookie() != null) {  } else {
      this.router.navigate(['/login']);
    }
   }

  // chama serviço CREATE
  form_submit(f: NgForm) {
    // pega valores do formulário
    this.name = f.controls.name.value;
    this.mesa = f.controls.mesa.value;
    this.consumidos = f.controls.consumidos.value;

    // requisição HTTP
    this.http.post(this.baseUrl + 'comanda/adicionar',
      {
        'name': this.name,
        'mesa': this.mesa,
        'consumidos': this.consumidos
      }, {headers: this.headers})
    .subscribe(
      res => {
        this.router.navigateByUrl('/lista');
        console.log(res);
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
