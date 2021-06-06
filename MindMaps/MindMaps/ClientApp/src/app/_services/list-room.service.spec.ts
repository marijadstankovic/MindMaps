import { TestBed } from '@angular/core/testing';

import { ListRoomService } from './list-room.service';

describe('ListRoomService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ListRoomService = TestBed.get(ListRoomService);
    expect(service).toBeTruthy();
  });
});
