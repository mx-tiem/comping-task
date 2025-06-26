import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CdkDrag, CdkDragHandle } from '@angular/cdk/drag-drop';
import { Chart } from '../chart/chart';
import { WidgetMap } from '../widget-map/widget-map';
import { LocationsList } from '../locations-list/locations-list';


export interface WidgetInterface {
  id: number;
  width: number;
  height: number;
  type: string;
  anchorX: number;
  anchorY: number;
  chartType?: 'line' | 'bar' | 'radar' | 'pie' | 'polarArea' | 'doughnut';
  mapName?: string;
  controls?: string;
}

@Component({
  selector: 'app-widget',
  imports: [Chart, WidgetMap, LocationsList, CdkDrag, CdkDragHandle],
  templateUrl: './widget.html',
  styleUrl: './widget.scss'
})
export class Widget {
  @Input() widget!: WidgetInterface;
  @Output() widgetMoved = new EventEmitter<any>();
  scrolling = false

  onDragEnded(event: any) {
    const handleDomData = event.source.element.nativeElement.querySelector('.widget-handle').getBoundingClientRect()
    const x = (handleDomData.left+handleDomData.right)/2
    const y = (handleDomData.top+handleDomData.bottom)/2
    this.widgetMoved.emit({dropPoint: {x: x, y: y}, widget: this.widget, event: event})
    event.source._dragRef.reset();
  }

  onScroll(event: any) {
    this.scrolling = event.target.scrollTop > 0
  }
}
