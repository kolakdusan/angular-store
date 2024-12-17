import { Directive, ElementRef, Self, Host, Optional } from '@angular/core'
import { AfterViewInit } from '@angular/core'
import { MatPaginator } from '@angular/material/paginator'
import { Renderer2 } from '@angular/core'

@Directive({
  selector: '[appCustomPagination]',
})
export class CustomPaginationDirective implements AfterViewInit {
  constructor(
    @Host() @Self() @Optional() private readonly matPag: MatPaginator,
    private elementRef: ElementRef,
    private ren: Renderer2
  ) {}

  ngAfterViewInit(): void {
    this.styleDefaultPagination()
    this.createBubbleDivRef()
  }

  private bubbleContainerRef: any
  private styleDefaultPagination() {
    const nativeElement = this.elementRef.nativeElement

    this.ren.setStyle(nativeElement, 'background-color', '#141414')
    this.ren.setStyle(nativeElement, 'border', '2px solid #262626 ')
    this.ren.setStyle(nativeElement, 'border-radius', '10px')
    this.ren.setStyle(nativeElement, 'padding', '0.rem 2rem')
    this.ren.setStyle(nativeElement, 'margin', '0.5rem')

    const itemsPerPage = nativeElement.querySelector(
      '.mat-mdc-paginator-page-size'
    )
    const howManyDisplayedEl = nativeElement.querySelector(
      '.mat-mdc-paginator-range-label'
    )

    // remove 'items per page'
    this.ren.setStyle(itemsPerPage, 'display', 'none')
    this.ren.setStyle(itemsPerPage, 'justify-self', 'flex-end')

    // style text of how many elements are currently displayed
    this.ren.setStyle(howManyDisplayedEl, 'position', 'absolute')
    this.ren.setStyle(howManyDisplayedEl, 'left', '0')
    this.ren.setStyle(howManyDisplayedEl, 'color', '#fff')
    this.ren.setStyle(howManyDisplayedEl, 'font-size', '14px')
    this.ren.setStyle(nativeElement, 'font-family', 'Urbanist')
  }

  private createBubbleDivRef(): void {
    const actionContainer = this.elementRef.nativeElement.querySelector(
      'div.mat-mdc-paginator-range-actions'
    )
    const nextButtonDefault = this.elementRef.nativeElement.querySelector(
      'button.mat-mdc-paginator-navigation-next'
    )

    // create a HTML element where all bubbles will be rendered
    this.bubbleContainerRef = this.ren.createElement('div') as HTMLElement
    this.ren.addClass(this.bubbleContainerRef, 'g-bubble-container')

    // render element before the 'next button' is displayed
    this.ren.insertBefore(
      actionContainer,
      this.bubbleContainerRef,
      nextButtonDefault
    )
  }
}
