import {instance} from '@config/intance';
import {detailChatInterface} from './interface';

type Props = (message: string) => void;
const chatServices = async (errorFunc?: Props, userId?: number) => {
  try {
    const response = await instance.get('/chat', {
      params: {
        userId: userId,
      },
    });
    return response.data;
  } catch (error) {
    errorFunc!('error connection');
    throw error;
  }
};
const chatDetailServices = async (errorFunc?: Props, id_chat?: number) => {
  try {
    const response = await instance.get('/detailChat', {
      params: {
        id_chat: id_chat,
      },
    });
    return response.data;
  } catch (error) {
    errorFunc!('error connection');
    throw error;
  }
};
const chatDetailSave = async (
  errorFunc?: Props,
  param?: detailChatInterface,
) => {
  try {
    const response = await instance.post('/detailChat', param);
    return response.data;
  } catch (error) {
    errorFunc!('error connection');
    throw error;
  }
};
const chatSave = async (errorFunc?: Props, id_user?: string) => {
  try {
    const response = await instance.post('/chat', {id_user: id_user});
    return response.data;
  } catch (error) {
    errorFunc!('error connection');
    throw error;
  }
};
const deleteChat = async (errorFunc?: Props, id?: number) => {
  try {
    const response = await instance.delete(`/chat/${id}`);
    return response.data;
  } catch (error) {
    errorFunc!('error connection');
    throw error;
  }
};
export {chatServices, chatDetailServices, chatDetailSave, chatSave, deleteChat};
