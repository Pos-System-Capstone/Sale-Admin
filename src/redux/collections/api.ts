import request from 'utils/axios';
import { TCollection } from 'types/collection';

export const getCollections = (params: any) => request.get<TCollection>('/collections', { params });

export const createCollection = (data: TCollection) =>
  request.post<TCollection>('/collections', data);

export const deleteCollection = (collectionId: number) =>
  request.delete<any>(`/collections/${collectionId}`);

export const updateCollection = (collectionId: number, data: TCollection) =>
  request.put<any>(`/collections/${collectionId}`, data);
