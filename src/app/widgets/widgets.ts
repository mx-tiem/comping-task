import { Component } from '@angular/core';
import { Widget, WidgetInterface } from './widget/widget';

@Component({
  selector: 'app-widgets',
  imports: [ Widget ],
  templateUrl: './widgets.html',
  styleUrl: './widgets.scss'
})
export class Widgets {
  grid: { [key:string]: (null | number)[] } = {
    row1: [null, null, null, null, null, null],
    row2: [null, null, null, null, null, null],
    row3: [null, null, null, null, null, null],
    row4: [null, null, null, null, null, null]
  }
  gridRows = () => Object.keys(this.grid);

  allWidgets: WidgetInterface[] = [
    { id: 1, width: 1, height: 1, anchorX: 1, anchorY: 1, type: 'list' },
    { id: 2, width: 2, height: 2, anchorX: 5, anchorY: 1,  type: 'chart' },
    { id: 3, width: 4, height: 2, anchorX: 2, anchorY: 3, type: 'map' }
  ]

  constructor() {
    this.checkFilledRows()
  }

  checkFilledRows() {
    this.allWidgets.forEach(widget => {
      for (let i = widget.anchorY; i < widget.anchorY + widget.height; i++) {
        for (let j = widget.anchorX; j < widget.anchorX + widget.width; j++) {
          this.grid[`row${i}`][j-1] = widget.id;
        }
      }
    })
  }
}
