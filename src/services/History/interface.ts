import userInterface from '@services/User/interface';

export interface RequestInterface {
  id?: string;
  title_job: string;
  status: string;
  by_request: string;
  do_date: string;
  member: number[] | any | userInterface[];
  item_request: string;
  notes: string;
}
