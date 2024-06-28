import {instance} from '@config/intance';
import {RequestInterface} from '@services/Request/interface';

type Props = (message: string) => void;
const getRequest = async (
  pageNumber: number,
  errorFunc?: Props,
  userId?: number,
) => {
  try {
    const response = await instance.get('/request', {
      params: {page: pageNumber, userId: userId},
    });
    return response.data;
  } catch (error) {
    errorFunc!('error connection');
    throw error;
  }
};
const getRequestAll = async (errorFunc?: Props, userId?: number) => {
  try {
    const response = await instance.get('/requestall', {
      params: {userId: userId},
    });
    return response.data;
  } catch (error) {
    errorFunc!('error connection');
    throw error;
  }
};
const getRequestAllSuper = async (pageNumber: number, errorFunc?: Props) => {
  try {
    const response = await instance.get('/allRequest', {
      params: {page: pageNumber},
    });
    return response.data;
  } catch (error) {
    errorFunc!('error connection');
    throw error;
  }
};
const getRequestId = async (errorFunc?: Props, id?: number) => {
  try {
    const response = await instance.get(`/request/${id}`);
    return response.data;
  } catch (error) {
    errorFunc!('error connection');
    throw error;
  }
};

const updateRequest = async (
  errorFunc?: Props,
  id?: number,
  params?: RequestInterface,
) => {
  try {
    const response = await instance.post(`/request/${id}`, params);
    return response.data;
  } catch (error) {
    errorFunc!('error connection');
    throw error;
  }
};
const addRequest = async (errorFunc?: Props, param?: RequestInterface) => {
  try {
    const response = await instance.post('/request', param);
    return response.data;
  } catch (error) {
    errorFunc!('error connection');
    throw error;
  }
};
const deleteRequest = async (errorFunc?: Props, id?: number) => {
  try {
    const response = await instance.delete(`/request/${id}`);
    return response.data;
  } catch (error) {
    errorFunc!('error connection');
    throw error;
  }
};
interface itemInterface {
  item_request: string;
}
const updateRequestItem = async (
  errorFunc?: Props,
  id?: number,
  params?: itemInterface,
) => {
  try {
    const response = await instance.post(`/requestitem/${id}`, params);
    return response.data;
  } catch (error) {
    errorFunc!('error connection');
    throw error;
  }
};
interface statusInterface {
  status: string;
}
const updateStatusRequest = async (
  errorFunc?: Props,
  id?: number,
  params?: statusInterface,
) => {
  try {
    const response = await instance.post(`/requeststatus/${id}`, params);
    return response.data;
  } catch (error) {
    errorFunc!('error connection');
    throw error;
  }
};

export {
  getRequest,
  getRequestId,
  getRequestAll,
  updateRequest,
  addRequest,
  deleteRequest,
  updateRequestItem,
  updateStatusRequest,
  getRequestAllSuper,
};
