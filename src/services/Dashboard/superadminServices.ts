import {instance} from '@config/intance';
import countStatusInterface from './interface';

type Props = (message: string) => void;
const statusCountService_1 = async (errorFunc?: Props, status?: string) => {
  try {
    const response = await instance.post('/dashboard', {
      status: status,
    });
    return response.data;
  } catch (error) {
    errorFunc!('error connection');
    throw error;
  }
};
const requestCountService_1 = async (errorFunc?: Props) => {
  try {
    const response = await instance.post('/dashboardRequestCount', {});
    return response.data;
  } catch (error) {
    errorFunc!('error connection');
    throw error;
  }
};
const historyCountService_1 = async (errorFunc?: Props) => {
  try {
    const response = await instance.post('/dashboardHistoryCount', {});
    return response.data;
  } catch (error) {
    errorFunc!('error connection');
    throw error;
  }
};

export {statusCountService_1, requestCountService_1, historyCountService_1};
