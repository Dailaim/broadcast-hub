import { MessageResponse, MessageCreate, MessageUpdate } from "../types/messages";
import { API_URL } from "../constants";
import { ErrorAPI } from "../types/error-api";

class MessageService {
  constructor(private baseUrl: string) {}

  private async parserResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      const data: ErrorAPI = await response.json();
      throw new Error(data.detail);
    }
    return response.json();
  }

  async getAll() {
    const response = await fetch(this.baseUrl + "/messages");
    console.log(response);
    return this.parserResponse<MessageResponse[]>(response);
  }

  async getById(id: number) {
    const response = await fetch(this.baseUrl + "/messages/" + id);
    return this.parserResponse<MessageResponse>(response);
  }

  async create(data: MessageCreate) {
    const response = await fetch(this.baseUrl + "/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return this.parserResponse<MessageResponse>(response);
  }

  async update(id: number, data: MessageUpdate) {
    const response = await fetch(this.baseUrl + "/messages/" + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return this.parserResponse<MessageResponse>(response);
  }

  async delete(id: number) {
    const response = await fetch(this.baseUrl + "/messages/" + id, {
      method: "DELETE",
    });
    return this.parserResponse<MessageResponse>(response);
  }
}

export const messageService = new MessageService(API_URL);
