import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ManoHabilService {
  private manoHabilSubject = new BehaviorSubject<string>('hand-right');
  manoHabil$ = this.manoHabilSubject.asObservable();

  cambiarManoHabil() {
    const nuevaManoHabil = this.manoHabilSubject.value === 'hand-left' ? 'hand-right' : 'hand-left';
    this.manoHabilSubject.next(nuevaManoHabil);
  }
}
