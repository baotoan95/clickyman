import { NgModule } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {MatButtonModule, MatCheckboxModule, MatIconModule, MatSidenavModule, MatTreeModule} from '@angular/material';
import {FormsModule} from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';

const materialModules = [
  MatProgressSpinnerModule,
  MatSidenavModule,
  MatCheckboxModule,
  MatTreeModule,
  MatIconModule,
  MatButtonModule,
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
export class SharedModule {}
