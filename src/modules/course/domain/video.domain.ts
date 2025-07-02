export class Video {
  id: string;
  courseId: string; // Relación con el curso
  title: string;
  description: string;
  videoUrl: string;
  duration: number; // en segundos
  order: number; // orden dentro del curso
  fileSize: number; // en bytes
  
  // Timestamps
  createdAt: Date;
  updatedAt: Date;
}
