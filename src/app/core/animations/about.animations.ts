import {
  trigger,
  transition,
  style,
  animate,
  query,
  stagger,
} from '@angular/animations'

export const pageAnimations = trigger('pageAnimations', [
  transition(':enter', [
    query(
      '.feature-card, .tech-chip, .about-header > *, .back-arrow, .tech-section > h2',
      [
        style({
          opacity: 0,
          transform: 'translateY(20px)',
        }),
        stagger(50, [
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
])
