import { AfterViewInit, Component } from '@angular/core';
import { Widget, WidgetInterface } from './widget/widget';

interface GridInterface {
  [key: string]: GridCellInterface[];
}
interface GridCellInterface {
  gridCellId: string | null;
  widgetId: number | null;
  type?: string;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  coordinates: {
    x: number;
    y: number;
  }
}

const initialGridCell: GridCellInterface = {
  gridCellId: null,
  widgetId: null,
  coordinates: {
    x: 0,
    y: 0
  },
  x1: 0,
  y1: 0,
  x2: 0,
  y2: 0
}

@Component({
  selector: 'app-widgets',
  imports: [ Widget ],
  templateUrl: './widgets.html',
  styleUrl: './widgets.scss'
})
export class Widgets implements AfterViewInit{
  grid: GridInterface = {
    row1: [initialGridCell, initialGridCell, initialGridCell, initialGridCell, initialGridCell, initialGridCell],
    row2: [initialGridCell, initialGridCell, initialGridCell, initialGridCell, initialGridCell, initialGridCell],
    row3: [initialGridCell, initialGridCell, initialGridCell, initialGridCell, initialGridCell, initialGridCell],
    row4: [initialGridCell, initialGridCell, initialGridCell, initialGridCell, initialGridCell, initialGridCell]
  }
  gridRows = () => Object.keys(this.grid);

  nextCellId = 0;

  allWidgets: WidgetInterface[] = [
    { id: 1, width: 1, height: 1, anchorX: 1, anchorY: 1, type: 'list' },
    { id: 2, width: 2, height: 1, anchorX: 3, anchorY: 1, type: 'chart' },
    { id: 3, width: 2, height: 2, anchorX: 5, anchorY: 3,  type: 'chart' },
    { id: 4, width: 4, height: 2, anchorX: 1, anchorY: 3, type: 'map' }
  ]

  constructor() {
    this.setGridCellIdsAndCoordinates()
    this.checkFilledRows()
  }

  ngAfterViewInit(): void {
    this.setGridCellXandYs()
  }

  setGridCellIdsAndCoordinates() {
    Object.keys(this.grid).forEach((rowKey, firstIndex) => {
      this.grid[rowKey].forEach((cell, secondIndex) => {
        let cellCopy = Object.assign({}, this.grid[rowKey][secondIndex])
        cellCopy.gridCellId = `grid-cell-${this.nextCellId}`;
        cellCopy.coordinates = {
          x: secondIndex + 1,
          y: firstIndex + 1
        }
        this.grid[rowKey][secondIndex] = cellCopy;
        this.nextCellId++;
      })
    })
  }

  checkFilledRows() {
    this.emptyAllCells()
    this.allWidgets.forEach(widget => {
      for (let i = widget.anchorY; i < widget.anchorY + widget.height; i++) {
        for (let j = widget.anchorX; j < widget.anchorX + widget.width; j++) {
          let cellCopy = Object.assign({}, this.grid[`row${i}`][j-1])
          cellCopy.widgetId = widget.id;
          cellCopy.type = widget.type;
          this.grid[`row${i}`][j-1] = cellCopy;
        }
      }
    })
  }

  setGridCellXandYs() {
    for (let i = 1; i <= 4; i++) {
      for (let j = 1; j <= 6; j++) {
        const gridCellId = (i - 1) * 6 + (j - 1);
        const htmlElement = document.getElementById(`grid-cell-${gridCellId}`)
        let domValues: {x1: number, y1: number, x2: number, y2: number} = {
          x1: htmlElement!.getBoundingClientRect().x,
          y1: htmlElement!.getBoundingClientRect().y,
          x2: htmlElement!.getBoundingClientRect().x + htmlElement!.getBoundingClientRect().width,
          y2: htmlElement!.getBoundingClientRect().y + htmlElement!.getBoundingClientRect().height
        }
        this.grid[`row${i}`][j-1].x1 = domValues.x1;
        this.grid[`row${i}`][j-1].y1 = domValues.y1;
        this.grid[`row${i}`][j-1].x2 = domValues.x2;
        this.grid[`row${i}`][j-1].y2 = domValues.y2;
      }
    }
  }

  widgetMoved({ dropPoint, widget, event }: { dropPoint: {x: number, y: number}, widget: WidgetInterface, event: any }) {
    if (this.canSnapToGrid(dropPoint, widget)) {
      this.snapWidgetToGrid(dropPoint, widget)
    } else {
      console.log(`reseting widget`)
      console.log(this.allWidgets)
      event.source._dragRef.reset()
    }
    this.checkFilledRows()
  }

  canSnapToGrid(dropPoint: { x: number, y: number }, widget: WidgetInterface): boolean {
    let occupiedCells: any[] = []
    let canSnap = true
    this.allWidgets.filter(filterWidget => {return filterWidget.id != widget.id} )
          .forEach(activeWidget => {
            occupiedCells.push(this.getOccupiedCells(activeWidget).map(cell => cell.gridCellId))
          })
    occupiedCells = occupiedCells.flat()
    
    let newAnchor = this.findCellIdByDropPoint(dropPoint)
    let newWidget = {...widget} 
    newWidget.anchorX = newAnchor!.coordinates.x
    newWidget.anchorY = newAnchor!.coordinates.y

    let newOccupiedCells = this.getOccupiedCells(newWidget)
    newOccupiedCells.forEach(newCell => {
      if (occupiedCells.includes(newCell.gridCellId)) {
        canSnap = false
      }
    })
    return canSnap;
  }

  snapWidgetToGrid(dropPoint: { x: number, y: number }, widget: WidgetInterface) {
    const targetCell = this.findCellIdByDropPoint(dropPoint);
    const widgetIndex = this.allWidgets.findIndex(w => w.id === widget.id);
    this.allWidgets[widgetIndex].anchorX = targetCell!.coordinates.x
    this.allWidgets[widgetIndex].anchorY = targetCell!.coordinates.y
  }

  findCellIdByDropPoint(dropPoint: { x: number, y: number }): GridCellInterface | null {
    for (const rowKey of Object.keys(this.grid)) {
      for (const cell of this.grid[rowKey]) {
        if (
          dropPoint.x >= cell.x1 &&
          dropPoint.x <= cell.x2 &&
          dropPoint.y >= cell.y1 &&
          dropPoint.y <= cell.y2
        ) {
          return cell;
        }
      }
    }
    return null;
  }

  emptyAllCells() {
    for (let i = 1; i <= 4; i++) {
      for (let j = 1; j <= 6; j++) {
        this.grid[`row${i}`][j-1].widgetId = null
      }
    }
  }

  getOccupiedCells(activeWidget: WidgetInterface) {
    let occupiedCells: GridCellInterface[] = []
    for(let i = activeWidget.anchorY; i < activeWidget.anchorY + activeWidget.height; i++ ) {
      for(let j = activeWidget.anchorX; j < activeWidget.anchorX + activeWidget.width; j++) {
        const foundCell = this.findCellByCoordinate(j, i)
        if (foundCell != 'null')
          occupiedCells.push(foundCell)
      }
    }
    return occupiedCells
  }

  findCellByCoordinate(x: number, y: number) {
    for (const rowKey of Object.keys(this.grid)) {
      for (const cell of this.grid[rowKey]) {
        if (cell.coordinates.x == x && cell.coordinates.y == y)
          return cell
      }
    }

    return 'null'
  }
}