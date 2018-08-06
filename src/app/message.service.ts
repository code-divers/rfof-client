import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs';
 
@Injectable({
  providedIn: 'root',
})
export class MessageService {
  messages: string[] = [];
  private messagesSource = new Subject<string[]>();
  observableLog$ = this.messagesSource.asObservable();
 
  add(message: string) {
    this.messages.push(message);
    this.messagesSource.next(this.messages);
  }
 
  clear() {
    this.messages = [];
  }
}