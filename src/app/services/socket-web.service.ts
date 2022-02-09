import { EventEmitter, Injectable, Output } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Socket } from 'ngx-socket-io';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class SocketWebService extends Socket  {

  @Output() outEven: EventEmitter<any> = new EventEmitter();

  constructor(private cookieService: CookieService) {
    super({
      url: `${environment.beUrl}`,
      options: {
        query:{
          comercioId: cookieService.get('comercioId'),
        },
        transports : ['websocket']
      }

    })
    this.listen();
  }

  listen = () =>{
    this.ioSocket.on('cliente', (res) => this.outEven.emit(res))
  }

  emitEvent = (payload = {}) =>{
    this.ioSocket.emit('comercio', payload)
  }

}
