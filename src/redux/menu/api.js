import request from '../../utils/axios';

export const getMenus = (params) =>
  request.get(`/stores/1160/menus`, {
    params
  });

export const getProductInMenus = (menuId, params) =>
  request.get(`/stores/1160/menus/${menuId}/products`, {
    params
  });

export const addProductInMenus = (menuId, data) =>
  request.post(`/stores/1160/menus/${menuId}/products`, data);

export const updateMenuInfo = (menuId, updateInfo) =>
  request.put(`/stores/1160/menus/${menuId}`, updateInfo);

export const updateProdInMenuInfo = (menuId, updateInfo) =>
  request.put(`/stores/1160/menus/${menuId}/products`, updateInfo);

export const deleteProductInMenu = (prods, menuId) =>
  request.delete(`/stores/1160/menus/${menuId}/products`, { data: prods });
