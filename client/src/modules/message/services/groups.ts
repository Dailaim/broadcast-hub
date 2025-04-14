import { GroupResponse, GroupCreate, GroupUpdate } from "../types/groups";
import { API_URL } from "../constants";
import { ErrorAPI } from "../types/error-api";

class GroupService {
  constructor(private baseUrl: string) {}

  private async parserResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      const data: ErrorAPI = await response.json();
      throw new Error(data.detail);
    }
    return response.json();
  }

  async getAll() {
    const response = await fetch(this.baseUrl + "/groups");
    return this.parserResponse<GroupResponse[]>(response);
  }

  async getById(id: number) {
    const response = await fetch(this.baseUrl + "/groups/" + id);
    return this.parserResponse<GroupResponse>(response);
  }

  async create(data: GroupCreate) {
    const response = await fetch(this.baseUrl + "/groups", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return this.parserResponse<GroupResponse>(response);
  }

  async update(id: number, data: GroupUpdate) {
    const response = await fetch(this.baseUrl + "/groups/" + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return this.parserResponse<GroupResponse>(response);
  }

  async delete(id: number) {
    const response = await fetch(this.baseUrl + "/groups/" + id, {
      method: "DELETE",
    });
    return this.parserResponse<GroupResponse>(response);
  }


}

export const groupService = new GroupService(API_URL);
