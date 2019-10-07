import {Component, OnInit, ViewChild} from "@angular/core";
import {MatSort, MatTableDataSource} from "@angular/material";
import {PostModel} from "../../../../shared/models/post.model";
import {HttpService} from "../../../../core/services/http.service";
import {DISPLAY_DATE_FORMAT} from "../../../../shared/constants/date.constant";

@Component({
  selector: "app-post-overview",
  templateUrl: "./overview.component.html",
  styleUrls: [
    "./overview.component.scss",
  ]
})
export class OverviewComponent implements OnInit {
  private DISPLAY_DATE_FORMAT = DISPLAY_DATE_FORMAT;
  private displayedColumns: string[];
  private dataSource: MatTableDataSource<PostModel>;

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private readonly http: HttpService) {
  }

  async ngOnInit() {
    const postPage = await this.http.req.get("http://localhost:3000/posts").toPromise();
    this.displayedColumns = ["title", "author", "category", "publishedDate", "createdDate", "updatedDate"];
    this.dataSource = new MatTableDataSource<PostModel>(postPage.data);
    this.dataSource.sort = this.sort;
  }
}
