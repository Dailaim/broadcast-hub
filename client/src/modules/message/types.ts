export interface Message {
	id: string;
	content: string;
	scheduledTime: string;
	recipients: string[];
	status: "pending" | "sent" | "failed";
}

export interface NewMessage {
	content: string;
	scheduledTime: string;
	recipients: string[];
}
