import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-servicios-app',
  templateUrl: './servicios-app.component.html',
  styleUrls: ['./servicios-app.component.scss']
})
export class ServiciosAppComponent implements OnInit {

  constructor(private accountService: AccountService, private router: Router, private activateRouter: ActivatedRoute) { }

  ngOnInit(): void {
    this.validarUsuario();
  }

  validarUsuario():void{
    this.accountService.validarUsuario().subscribe((res)=>{
      if(res.servicio){
        localStorage.setItem('token', res.token);
        this.router.navigate(['/dashboard'])
      }
      else{
        this.router.navigate(['/servicios'])
      }
      // this.router.navigate(['/servicios'])
    })
  }

}
