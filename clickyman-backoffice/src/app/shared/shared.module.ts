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
import {FormsModule} from "@angular/forms";
import {TranslateModule} from "@ngx-translate/core";
import {MatSortModule} from "@angular/material/sort";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";

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
  MatInputModule
];

const commonModules = [
  FormsModule,
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
