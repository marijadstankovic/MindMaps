import { TestBed } from '@angular/core/testing';

import { EditorHubService } from './editor-hub.service';

describe('EditorHubService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EditorHubService = TestBed.get(EditorHubService);
    expect(service).toBeTruthy();
  });
});
