import { TestBed, inject } from '@angular/core/testing';

import { ImageGalleryService } from './image-gallery.service';

describe('ImageGalleryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ImageGalleryService]
    });
  });

  it('should be created', inject([ImageGalleryService], (service: ImageGalleryService) => {
    expect(service).toBeTruthy();
  }));
});
