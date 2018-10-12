import { Component } from '@angular/core';
import {ChatService} from './chat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  private message: string;
  private messages: string[] = [];

  constructor(private chatService: ChatService){}

  ngOnInit(){

    this.chatService
      .getMessages()
      .subscribe((message: string) => {
        this.messages.push(message);
      });
  }


  sendMessage(){
    this.chatService.sendMessage(this.message);
    this.message = '';
  }




}
