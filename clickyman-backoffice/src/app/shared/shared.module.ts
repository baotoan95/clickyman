import {NgModule} from "@angular/core";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {
  MatButtonModule,
  MatCheckboxModule,
  MatIconModule,
  MatSidenavModule,
  MatTableModule,
  MatToolbarModule,
  MatTreeModule
} from "@angular/material";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TranslateModule} from "@ngx-translate/core";
import {MatSortModule} from "@angular/material/sort";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatDialogModule} from "@angular/material/dialog";
import {MatCardModule} from "@angular/material/card";
import {MatPaginatorModule} from "@angular/material/paginator";

const materialModules = [
  MatProgressSpinnerModule,
  MatSidenavModule,
  MatCheckboxModule,
  MatTreeModule,
  MatIconModule,
  MatButtonModule,
  MatToolbarModule,
  MatTableModule,
  MatSortModule,
  MatFormFieldModule,
  MatInputModule,
  MatSnackBarModule,
  MatTooltipModule,
  MatDialogModule,
  MatCardModule,
  MatPaginatorModule,
];

const commonModules = [
  FormsModule,
  ReactiveFormsModule,
];

@NgModule({
  imports: [
    ...materialModules,
    ...commonModules,
    TranslateModule
  ],
  exports: [
    ...materialModules,
    ...commonModules,
    TranslateModule
  ],
})
export class SharedModule {
}
