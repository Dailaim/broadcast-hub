export interface MessageResponse {
  id: number;
  content: string;
  scheduled_time: string;
  group_id: number;
  status:  "pending" | "sent" | "failed";
}

export interface MessageCreate {
  content: string;
  scheduled_time: string;
  group_id: number;
}

export interface MessageUpdate {
  content?: string;
  scheduled_time?: string;
  group_id?: number;
}
