export interface Session {
  picture?: File | string;
  supabasePicture?: string;
  title: string;
  location: string;
  participants: number;
  material: string;
  level: string;
  content: string;
  style: string;
  length: number;
  date: string;
  owner?: string;
  id?: string;
}

export interface SessionsState {
  sessions: Session[];
  session: Session;
}
