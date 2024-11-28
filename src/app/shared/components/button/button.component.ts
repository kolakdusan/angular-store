import { Component, Input, Output, EventEmitter } from '@angular/core'

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent {
  @Input() buttonClass: string = ''
  @Input() isDisabled: boolean = false
  @Output() onButtonClick = new EventEmitter<void>()

  handleClick(event: MouseEvent) {
    console.log('Button click')
    event.stopPropagation()
    if (!this.isDisabled) {
      this.onButtonClick.emit()
    }
  }
}
