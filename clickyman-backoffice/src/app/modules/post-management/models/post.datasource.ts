import {CollectionViewer, DataSource} from "@angular/cdk/collections";
import {PostModel} from "../../../shared/models/post.model";
import {Observable} from "rxjs";

export class PostDatasource implements DataSource<PostModel> {
  connect(collectionViewer: CollectionViewer): Observable<PostModel[] | ReadonlyArray<PostModel>> {
    return undefined;
  }

  disconnect(collectionViewer: CollectionViewer): void {
  }

}
