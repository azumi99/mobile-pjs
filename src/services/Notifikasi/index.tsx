import {instance} from '@config/intance';

type Props = (message: string) => void;
const getNotif = async (errorFunc?: Props, id_user?: number) => {
  try {
    const response = await instance.get('/notif', {
      params: {id_user: id_user},
    });
    return response.data;
  } catch (error) {
    errorFunc!('error connection');
    throw error;
  }
};
const deleteNotif = async (errorFunc?: Props, id?: string) => {
  try {
    const response = await instance.delete(`/notif/${id}`);
    return response.data;
  } catch (error) {
    errorFunc!('error connection');
    throw error;
  }
};
export {getNotif, deleteNotif};
