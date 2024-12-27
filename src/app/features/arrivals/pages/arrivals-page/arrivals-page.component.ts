import { Component } from '@angular/core'
import {
  trigger,
  transition,
  style,
  animate,
  query,
  stagger,
} from '@angular/animations'

@Component({
  selector: 'app-arrivals-page',
  templateUrl: './arrivals-page.component.html',
  styleUrl: './arrivals-page.component.scss',
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        query(
          '.content-column > *',
          [
            style({
              opacity: 0,
              transform: 'translateY(20px)',
              transition: 'color 0.3s ease',
            }),
            stagger(100, [
              animate(
                '400ms cubic-bezier(0.4, 0, 0.2, 1)',
                style({
                  opacity: 1,
                  transform: 'translateY(0)',
                })
              ),
            ]),
          ],
          { optional: true }
        ),
      ]),
    ]),
  ],
})
export class ArrivalsPageComponent {}
