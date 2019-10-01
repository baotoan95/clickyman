import {Component} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FlatTreeControl} from '@angular/cdk/tree';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material';

interface FoodNode {
  name: string;
  children?: FoodNode[];
}

interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

const TREE_DATA: FoodNode[] = [
  {
    name: 'Fruit',
    children: [
      {name: 'Apple'},
      {name: 'Banana'},
      {name: 'Fruit loops'},
    ]
  }, {
    name: 'Vegetables',
    children: [
      {
        name: 'Green',
        children: [
          {name: 'Broccoli'},
          {name: 'Brussel sprouts'},
        ]
      }, {
        name: 'Orange',
        children: [
          {name: 'Pumpkins'},
          {name: 'Carrots'},
        ]
      },
    ]
  },
];


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public title = 'clickyman-blog';
  public opened: boolean;

  public _transformer = (node: FoodNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
    };
  }

  public treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level, node => node.expandable);

  public treeFlattener = new MatTreeFlattener(
    this._transformer, node => node.level, node => node.expandable, node => node.children);

  public dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor(private http: HttpClient, ) {
    this.dataSource.data = TREE_DATA;
  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  callApi() {
    this.http.get('http://www.mocky.io/v2/5d29fb823000006c005a40ca?mocky-delay=100ms')
      .subscribe(data => {
        console.log(data);
        throw Error('Hihi');
      });
  }
}
