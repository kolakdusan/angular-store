import { Component } from '@angular/core'
import {
  faRocket,
  faCode,
  faCube,
  faWandMagicSparkles,
  faArrowLeft,
} from '@fortawesome/free-solid-svg-icons'

import { pageAnimations } from 'app/core/animations/about.animations'

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  animations: [pageAnimations],
})
export class AboutComponent {
  faRocket = faRocket
  faCode = faCode
  faCube = faCube
  faWand = faWandMagicSparkles
  faArrowLeft = faArrowLeft

  features = [
    {
      title: 'Modern Stack',
      description: 'Built with Angular & NgRx',
      icon: this.faRocket,
    },
    {
      title: 'Clean Code',
      description: 'Type-safe & well-structured',
      icon: this.faCode,
    },
    {
      title: '3D Ready',
      description: 'Spline integration',
      icon: this.faCube,
    },
    {
      title: 'Sleek Design',
      description: 'Glass-morphism inspired',
      icon: this.faWand,
    },
  ]

  techStack = ['Angular', 'NgRx', 'Material', 'DummyJSON', 'Spline']
}
