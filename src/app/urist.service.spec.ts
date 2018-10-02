import { TestBed, inject } from '@angular/core/testing';

import { UristService } from './urist.service';

describe('UristService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UristService]
    });
  });

  it('should be created', inject([UristService], (service: UristService) => {
    expect(service).toBeTruthy();
  }));
});
