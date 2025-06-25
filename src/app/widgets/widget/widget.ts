import { Component, Input } from '@angular/core';
import { CdkDrag, CdkDragHandle } from '@angular/cdk/drag-drop';


export interface WidgetInterface {
  id: number;
  width: number;
  height: number;
  type: string;
  anchorX: number;
  anchorY: number;
  snapable?: boolean;
}

@Component({
  selector: 'app-widget',
  imports: [CdkDrag, CdkDragHandle],
  templateUrl: './widget.html',
  styleUrl: './widget.scss'
})
export class Widget {
  @Input() widget!: WidgetInterface;

  onDragEnded($event: any) {
    
  }
}
