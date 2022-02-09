import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError } from 'rxjs';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.scss']
})
export class VerifyComponent implements OnInit {

  public isSuccess: boolean = false;
  public title: string = '';
  public descripcion: string = '';
  constructor(private router: ActivatedRoute, private accountService: AccountService) { }

  ngOnInit(): void {
    this.router.params.
    subscribe((res)=>{
      const {usuarioId} = res;
      if(usuarioId){
        this.isSuccess = true;
        this.accountService.activarUsuario(usuarioId)
        .pipe(
          catchError((err) =>{
            this.title = 'UPS!';
            this.descripcion = err.error.msg;
            throw 'Details: ' + err.error.msg;
          })
        )
        .subscribe((ok)=>{
          this.title = 'felicitaciones!';
          this.descripcion = 'Ha verificado su cuenta exitosamente. Ya puede comenzar a utilizar nuestros servicios!'
          return
        })
      }
      else{
        console.log("ERROR")
      }

    })
  }

}
