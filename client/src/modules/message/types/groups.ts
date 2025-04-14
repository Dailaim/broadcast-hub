export interface GroupResponse {
  id: number;
  name: string;
}

export interface GroupCreate {
  name: string;
}

export interface GroupUpdate {
  name?: string;
}
