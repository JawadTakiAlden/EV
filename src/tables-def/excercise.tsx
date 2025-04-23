export interface Exercise {
  id?: number;
  name: string;
  name_ar: string;
  description?: string;
  description_ar?: string;
  duration?: number;
  image_urls?: string[];
  target_muscles_image?: string;
  video_url?: string;
  createdAt?: Date;
  updatedAt?: Date;
  notes: string[];
  notes_ar: string[];
  cooling_time: number;
}
