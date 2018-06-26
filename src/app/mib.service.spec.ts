import { TestBed, inject } from '@angular/core/testing';

import { MIBService } from './mib.service';

describe('MIBService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MIBService]
    });
  });

  it('should be created', inject([MIBService], (service: MIBService) => {
    expect(service).toBeTruthy();
  }));
});
