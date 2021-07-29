import request from '../../utils/axios';

export interface Menu {
  product_menu_id: number;
  product_menu_name: String;
  brand_id: number;
  active: boolean;
}

export const getMenus = (params: any): any =>
  request.get<Menu>(`/menu-in-stores`, {
    params
  });

export const getProductInMenus = (menuId: number, params: any) =>
  request.get(`/stores/1160/menus/${menuId}/products`, {
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
