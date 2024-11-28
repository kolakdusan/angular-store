import { Component } from '@angular/core'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss',
})
export class SearchBarComponent {
  faSearch = faSearch

  searchTerm: string = ''

  onSearch(): void {
    console.log('Searching for:', this.searchTerm)
  }
}
