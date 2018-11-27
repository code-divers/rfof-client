import { TestBed, inject } from '@angular/core/testing';

import { RfofchatService } from './rfofchat.service';

describe('RfofchatService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RfofchatService]
    });
  });

  it('should be created', inject([RfofchatService], (service: RfofchatService) => {
    expect(service).toBeTruthy();
  }));
});
