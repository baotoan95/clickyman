import {Component} from "@angular/core";
import {FlatTreeControl} from "@angular/cdk/tree";
import {MatTreeFlatDataSource, MatTreeFlattener} from "@angular/material";

interface MenuNode {
  name: string;
  url: string;
  children?: MenuNode[];
}

interface FlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

const TREE_DATA: MenuNode[] = [
  {
    name: "Post management",
    url: "",
    children: [
      {
        name: "Overview",
        url: "overview",
      },
      {
        name: "Add new",
        url: "add-new",
      },
    ]
  }
];

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  private readonly treeControl;
  private readonly treeFlattener;
  private readonly dataSource;
  private opened: boolean;

  constructor() {
    this.treeFlattener = new MatTreeFlattener(
      this.transformer, node => node.level, node => node.expandable, node => node.children);
    this.treeControl = new FlatTreeControl<FlatNode>(node => node.level, node => node.expandable);
    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
    this.dataSource.data = TREE_DATA;
  }

  hasChild = (_: number, node: FlatNode) => node.expandable;

  private transformer = (node: MenuNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level,
    };
  }

}
