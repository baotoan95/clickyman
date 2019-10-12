import {Injectable} from "@angular/core";
import {MatSnackBar, MatSnackBarConfig, MatSnackBarRef, SimpleSnackBar} from "@angular/material/snack-bar";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ErrorDialogComponent} from "../components/dialog/error-dialog/error-dialog.component";
import {TranslateService} from "@ngx-translate/core";

export interface INotificationConfig {
  message: string;
  textBtn?: string;
  config?: MatSnackBarConfig<any>;
}

@Injectable()
export class NotificationService {
  constructor(
    private readonly snackBar: MatSnackBar,
    private readonly dialog: MatDialog,
    private readonly transalator: TranslateService,
  ) {}

  public async pushSnackBar(notification: INotificationConfig): Promise<MatSnackBarRef<SimpleSnackBar>> {
    const defaultTextButton: string = await this.transalator.get("app.common.ok").toPromise();
    notification = {
      config: {
        duration: 3 * 1000, // Default duration (3s)
      },
      textBtn: defaultTextButton,
      ...notification,
    };
    return this.snackBar.open(notification.message, notification.textBtn, notification.config);
  }

  public pushDialog(notification: INotificationConfig): MatDialogRef<{}, any> {
    return this.dialog.open(ErrorDialogComponent, {
      width: "500px",
      data: notification,
    });
  }
}
