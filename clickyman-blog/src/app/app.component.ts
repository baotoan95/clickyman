import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.styl']
})
export class AppComponent {
  title = 'clickyman-blog';

  constructor(private http: HttpClient) { }

  callApi() {
    this.http.get('http://www.mocky.io/v2/5d29fb823000006c005a40ca?mocky-delay=100ms')
      .subscribe(data => {
        console.log(data);
        throw Error("Hehe")
      })
  }
}
