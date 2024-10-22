import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ManoHabilService {
  private manoHabilSubject = new BehaviorSubject<string>('hand-right');
  manoHabil$ = this.manoHabilSubject.asObservable();

  constructor() {
    // Cargar mano habil desde localStorage en la inicialización del servicio
    const manoHabilFromStorage = localStorage.getItem('manoHabil');
    if (manoHabilFromStorage) {
      this.manoHabilSubject.next(manoHabilFromStorage);
    }
  }

  cambiarManoHabil() {
    const nuevaManoHabil = this.manoHabilSubject.value === 'hand-left' ? 'hand-right' : 'hand-left';
    this.manoHabilSubject.next(nuevaManoHabil);
  }

  setManoHabil(manoHabil: string) {
    this.manoHabilSubject.next(manoHabil);
  }
}
