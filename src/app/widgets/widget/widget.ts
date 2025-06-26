import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CdkDrag, CdkDragHandle } from '@angular/cdk/drag-drop';
import { Chart } from '../chart/chart';


export interface WidgetInterface {
  id: number;
  width: number;
  height: number;
  type: string;
  anchorX: number;
  anchorY: number;
  chartType?: 'line' | 'bar' | 'radar' | 'pie' | 'polarArea' | 'doughnut';
}

@Component({
  selector: 'app-widget',
  imports: [Chart, CdkDrag, CdkDragHandle],
  templateUrl: './widget.html',
  styleUrl: './widget.scss'
})
export class Widget {
  @Input() widget!: WidgetInterface;
  @Output() widgetMoved = new EventEmitter<any>();

  onDragEnded(event: any) {
    const handleDomData = event.source.element.nativeElement.querySelector('.widget-handle').getBoundingClientRect()
    const x = (handleDomData.left+handleDomData.right)/2
    const y = (handleDomData.top+handleDomData.bottom)/2
    this.widgetMoved.emit({dropPoint: {x: x, y: y}, widget: this.widget, event: event})
    event.source._dragRef.reset();
  }

  
}
