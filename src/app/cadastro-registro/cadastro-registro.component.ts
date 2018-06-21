import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { CookieService } from 'ngx-cookie';

@Component({
  selector: 'app-cadastro-registro',
  templateUrl: './cadastro-registro.component.html',
  styleUrls: ['./cadastro-registro.component.css']
})
export class CadastroRegistroComponent implements OnInit {

  comanda;

  name: String;
  mesa: String;
  consumidos: String;

  baseUrl;
  headers;

  data;

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router, private _cookieService: CookieService) {

    this.baseUrl = 'https://backendqg.herokuapp.com/';

    this.headers = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'});
  }

  ngOnInit() {
    if (this.getCookie() != null) {
      this.route.params.subscribe(params => {
        this.getComandaById(params['id']);
      });
    } else {
      this.router.navigate(['/login']);
    }
  }

  // Busca a comanda a ser alterado (para popula campos)
  getComandaById(id) {
    this.http.get(this.baseUrl + 'comanda/edit/' + id, {headers: this.headers})
    .subscribe(
      res => { this.comanda = res; },
      err => { console.log(err); }
    );
  }

  // chama serviço UPDATE
  updateComanda(form: NgForm) {
    // Pega valores do formulário
    this.name = form.controls.name.value;
    this.mesa = form.controls.mesa.value;
    this.consumidos = form.controls.consumidos.value;

    this.route.params.subscribe(params => {
      // Requisição HTTP
      this.http.post(this.baseUrl + 'comanda/update/' + params['id'],
        {
          'name': this.name,
          'mesa': this.mesa,
          'consumidos': this.consumidos
        }, {headers: this.headers})
      .subscribe(
        res => {
          console.log(res);
        },
        err => { console.log(err); }
      );

      // adicionar registro
      this.http.post(this.baseUrl + 'registro/adicionar',
        {
          'name': this.name,
          'mesa': this.mesa,
          'consumidos': this.consumidos
        }, {headers: this.headers})
      .subscribe(
        res => {
          console.log(res);
        },
        err => { console.log(err); }
      );
      // apagar comanda
      this.http.get(this.baseUrl + 'comanda/delete/' + params['id'], {headers: this.headers})
      .subscribe(
        res => {
          alert(res);
          this.router.navigate(['/listar']);
        },
        err => {
          console.log(err);
        }
      );

    });

  }

  getCookie() {
    return this._cookieService.get('token');
  }
}
