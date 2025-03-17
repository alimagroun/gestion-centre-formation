export interface SubjectRequest {
  name: string;
  description?: string;
  totalHours: number;
  theoreticalHours: number;
  practicalHours: number;
  specialtyId: number;
}
