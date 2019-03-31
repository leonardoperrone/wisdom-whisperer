export class Picture {
  id: number;
  url: string;
  country?: string;
}

export class ImageGallery {
  key: string;
  imageName: string;
  thumbnailName: string;
  country: string;
  index: number;
  urlMainPic: string;
  urlThumbnailPic: string;
  description: string;
  mainImage: File;
  thumbnailImage: File;
  countryRep?: string;

// add thumbnail

  constructor(pic: File, thumbnail: File) {
    this.mainImage = pic;
    this.thumbnailImage = thumbnail;
  }
}
