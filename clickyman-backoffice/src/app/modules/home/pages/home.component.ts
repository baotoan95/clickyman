import {Component} from '@angular/core';
import {Observable} from 'rxjs';
import {AngularFirestore} from '@angular/fire/firestore';

@Component({
  selector: "clickyman-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent {
  public books: Observable<any[]>;

  constructor(private db: AngularFirestore) {
    this.books = db.collection('/books').valueChanges();
    console.log(this.books);
  }
}
