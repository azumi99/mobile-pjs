import {instance} from '@config/intance';
import countStatusInterface from './interface';

type Props = (message: string) => void;
const statusCountService = async (
  errorFunc?: Props,
  userId?: number,
  status?: string,
) => {
  try {
    const response = await instance.post('/dashboard', {
      userId: userId,
      status: status,
    });
    return response.data;
  } catch (error) {
    errorFunc!('error connection');
    throw error;
  }
};
const requestCountService = async (errorFunc?: Props, userId?: number) => {
  try {
    const response = await instance.post('/dashboardRequestCount', {
      userId: userId,
    });
    return response.data;
  } catch (error) {
    errorFunc!('error connection');
    throw error;
  }
};
const historyCountService = async (errorFunc?: Props, userId?: number) => {
  try {
    const response = await instance.post('/dashboardHistoryCount', {
      userId: userId,
    });
    return response.data;
  } catch (error) {
    errorFunc!('error connection');
    throw error;
  }
};

export {statusCountService, requestCountService, historyCountService};
