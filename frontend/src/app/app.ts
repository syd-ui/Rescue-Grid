import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
  template: `
    <div style="padding: 20px;">
      <h1>Angular + Node.js Project</h1>
      <button (click)="getMessage()">Call Backend API</button>
      <div *ngIf="message">
        <h3>Response from backend:</h3>
        <pre>{{ message | json }}</pre>
      </div>
    </div>
  `
})
export class App {
  protected readonly title = signal('frontend');

   message: any;

  constructor(private http: HttpClient) {}

  getMessage() {
    this.http.get('/api/message').subscribe({
      next: (data) => {
        this.message = data;
        console.log('Backend response:', data);
      },
      error: (error) => {
        console.error('Error:', error);
      }
    });
  }
}
