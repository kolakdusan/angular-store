import { Component, Output, EventEmitter } from '@angular/core'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss',
})
export class SearchBarComponent {
  faSearch = faSearch

  searchTerm: string = ''

  @Output() searchChanged: EventEmitter<string> = new EventEmitter()

  onSubmit(): void {
    const sanitizedSearchTerm = this.sanitizeInput(this.searchTerm)
    this.searchChanged.emit(sanitizedSearchTerm)
  }

  sanitizeInput(input: string): string {
    return input.trim().replace(/\s+/g, ' ')
  }
}
