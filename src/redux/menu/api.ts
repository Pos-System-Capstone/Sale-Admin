import { TStoreApplyMenu } from 'types/menu';
import request from '../../utils/axios';

export interface Menu {
  product_menu_id: number;
  product_menu_name: String;
  brand_id: number;
  active: boolean;
}

export const getMenus = (params: any): any =>
  request.get<Menu>(`/menus`, {
    params
  });

export const getStoreApplyMenus = (menuId: number, params?: any): any =>
  request.get<TStoreApplyMenu>(`/menus/${menuId}/stores`, {
    params
  });

export const addStoreApplyMenus = (menuId: number, data: any): any =>
  request.post(`/menus/${menuId}/stores`, data);

export const updateStoreApplyMenus = (menuId: number, storeId: number, data: any): any =>
  request.put(`/menus/${menuId}/stores/${storeId}`, data);

export const deleteStoreApplyMenus = (menuId: number, storeId: number): any =>
  request.delete(`/menus/${menuId}/stores/${storeId}`);

export const getProductInMenus = (menuId: number, params: any) =>
  request.get(`/menus/${menuId}/products`, {
    params
  });

export const addProductInMenus = (menuId: number, data: any) =>
  request.post(`/stores/1160/menus/${menuId}/products`, data);

export const updateMenuInfo = (menuId: number, updateInfo: any) =>
  request.put(`/stores/1160/menus/${menuId}`, updateInfo);

export const updateProdInMenuInfo = (menuId: number, updateInfo: any) =>
  request.put(`/stores/1160/menus/${menuId}/products`, updateInfo);

export const deleteProductInMenu = (prods: Array<any>, menuId: number[]) =>
  request.delete(`/stores/1160/menus/${menuId}/products`, { data: prods });
