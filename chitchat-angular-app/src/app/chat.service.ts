import { Injectable } from '@angular/core';
import { Observable } from 'rxjs-compat/Observable';
import { HttpClient } from '@angular/common/http';

import * as io from 'socket.io-client';



@Injectable()
export class ChatService {

  private url: string = 'http://localhost:9000';
  private socket;

  private UUID: string;

  constructor(private http: HttpClient) {
    this.socket = io(this.url);
    this.socket.on('uuidassign', (uuid) => {

      this.UUID = uuid;

    });
  }


  public sendMessage(message) {

    this.socket.emit('newmessage', this.UUID + ': ' + message);

  }


  public getMessages = () => {

  return Observable.create((observer) => {

    this.socket.on('newmessage', (message) => {
      observer.next(message);
    });
  });

}


}
