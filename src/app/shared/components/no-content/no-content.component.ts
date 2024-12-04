import { Component, Output, EventEmitter } from '@angular/core'

@Component({
  selector: 'app-no-content',
  templateUrl: './no-content.component.html',
  styleUrls: ['./no-content.component.scss'],
})
export class NoContentComponent {
  @Output() resetFilters: EventEmitter<void> = new EventEmitter()

  onResetFilters(): void {
    this.resetFilters.emit()
  }
}
