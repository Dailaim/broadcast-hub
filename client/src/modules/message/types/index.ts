export interface Message {
	id: number;
	content: string;
	scheduledTime: string;
	group_id: number;
	status: "pending" | "sent" | "failed";
}

export interface NewMessage {
	content: string;
	scheduledTime: string;
	group_id?: number;
}
