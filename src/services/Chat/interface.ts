import userInterface from '@services/User/interface';

export interface ChatInterface {
  id?: number;
  id_user?: string;
  last_message?: string;
  created_at?: string;
  users: userInterface[];
}

export interface detailChatInterface {
  id_chat?: number;
  id_user?: number;
  _id?: number;
  message?: string;
}
