import {instance} from '@config/intance';

type Props = (message: string) => void;
const getHistory = async (
  pageNumber: number,
  errorFunc?: Props,
  userId?: number,
) => {
  try {
    const response = await instance.get('/history', {
      params: {page: pageNumber, userId: userId},
    });
    return response.data;
  } catch (error) {
    errorFunc!('error connection');
    throw error;
  }
};
const getHistorytAll = async (errorFunc?: Props, userId?: number) => {
  try {
    const response = await instance.get('/historyall', {
      params: {userId: userId},
    });
    return response.data;
  } catch (error) {
    errorFunc!('error connection');
    throw error;
  }
};
const getHistorytAllSuper = async (pageNumber: number, errorFunc?: Props) => {
  try {
    const response = await instance.get('/allHistory', {
      params: {page: pageNumber},
    });
    return response.data;
  } catch (error) {
    errorFunc!('error connection');
    throw error;
  }
};

export {getHistory, getHistorytAll, getHistorytAllSuper};
