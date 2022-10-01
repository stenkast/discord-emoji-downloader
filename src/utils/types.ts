export type Guild = {
  id: string;
  name: string;
};

export type Emoji = {
  id: string;
  name: string;
  animated: boolean;
};

export interface Done {
  type: "failure" | "ready" | "archiving";
  error: boolean;
  message: string;
}
