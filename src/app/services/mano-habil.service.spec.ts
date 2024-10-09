import { TestBed } from '@angular/core/testing';

import { ManoHabilService } from './mano-habil.service';

describe('ManoHabilService', () => {
  let service: ManoHabilService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManoHabilService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
