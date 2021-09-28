import { TestBed } from '@angular/core/testing';

import { MindmapsService } from './mindmaps.service';

describe('MindmapsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MindmapsService = TestBed.get(MindmapsService);
    expect(service).toBeTruthy();
  });
});
