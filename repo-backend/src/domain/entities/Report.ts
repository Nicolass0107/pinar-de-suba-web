export type ReportStatus = "OPEN" | "IN_PROGRESS" | "CLOSED";

export interface Report {
  id: string;
  title: string;
  description: string;
  category: string;
  latitude?: number | null;
  longitude?: number | null;
  status: ReportStatus;
  createdAt: Date;
}

export interface CreateReportInput {
  title: string;
  description: string;
  category: string;
  latitude?: number;
  longitude?: number;
}
