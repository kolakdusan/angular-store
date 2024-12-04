import {
  Component,
  Output,
  EventEmitter,
  OnDestroy,
  OnInit,
} from '@angular/core'
import { Subject } from 'rxjs'
import { debounceTime } from 'rxjs'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss',
})
export class SearchBarComponent implements OnInit, OnDestroy {
  faSearch = faSearch
  inputText: string = ''
  searchSubject = new Subject<string>()
  debounceTimeMs = 500

  @Output() searchChanged: EventEmitter<string> = new EventEmitter()

  onSearch() {
    this.searchSubject.next(this.inputText)
  }

  performSearch(searchValue: string) {
    const sanitizedInputText = this.sanitizeInput(searchValue)
    this.searchChanged.emit(sanitizedInputText)
  }

  sanitizeInput(input: string): string {
    return input.trim().replace(/\s+/g, ' ')
  }

  ngOnInit() {
    this.searchSubject
      .pipe(debounceTime(this.debounceTimeMs))
      .subscribe((searchValue) => {
        this.performSearch(searchValue)
      })
  }

  ngOnDestroy() {
    this.searchSubject.complete()
  }
}
