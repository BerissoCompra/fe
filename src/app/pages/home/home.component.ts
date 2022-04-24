import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';
import { Comercio } from 'src/app/models/comercio';
import { AccountService } from 'src/app/services/account.service';
import { AlertsService } from 'src/app/services/alerts-services.service';
import { ComercioService } from 'src/app/services/comercio.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private alertService: AlertsService, private accountService: AccountService, private comercioService: ComercioService ,private router: Router) { }
  comercio: Comercio;
  fechaHoy: Date = new Date();
  loading: boolean = false;

  ngOnInit(): void {
    this.comercioService.obtenerComercio()
    .pipe(catchError((res)=>{
      const error = res.error.msg;
      this.alertService.error(error)
      throw 'error in source. Details: ' + res;
    }))
    .subscribe((res)=>{
      this.comercioService.comercio = res;
      this.comercio = this.comercioService.comercio;
      this.comercioService.actualizarInfoComercio(res)
      this.loading = true;
    })
  }
}
