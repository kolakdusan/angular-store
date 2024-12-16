import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'replaceHyphen',
})
export class ReplaceHyphenPipe implements PipeTransform {
  transform(value: string | null): string {
    if (!value) return ''
    return value.replace(/-/g, ' ')
  }
}
