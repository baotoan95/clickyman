import {Component, EventEmitter, Input, Output} from "@angular/core";

export enum MessageType {
  NORMAL = "normal-message",
  ERROR = "error-message",
  SUCCESS = "success-message",
  INFO = "info-message",
  WARNING = "warning-message",
}

@Component({
  selector: "app-message-box",
  templateUrl: "./message-box.component.html",
  styleUrls: [
    "./message-box.component.scss"
  ]
})
export class MessageBoxComponent {
  @Input() private type = MessageType.NORMAL;
  @Input() private message;
  @Output() onClose = new EventEmitter();

  public get isClosed(): boolean {
    return this.message === "";
  }

  public close(): void {
    this.message = "";
    this.onClose.emit(this.isClosed);
  }
}
