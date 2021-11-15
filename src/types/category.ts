export type TCategory = {
  cate_id: number;
  cate_name: string;
  cate_name_eng?: any;
  is_extra: boolean;
  store_id: number;
  seo_name: string;
  seo_keyword?: any;
  seo_description?: any;
  parent_cate_id?: any;
  position: number;
  active: boolean;
  brand_id: number;
  pic_url?: any;
  banner_url?: any;
  description?: any;
  description_eng?: any;
  banner_description?: any;
  banner_description_eng?: any;
  parent_cate?: any;
  category_extra_cate: CategoryExtraCate[];
  category_modifier: any[];
  childs: TCategory[];
};

export interface CategoryExtraCate {
  id: number;
  cate_id: number;
  extra_cate_id: number;
  min_max: string;
  cate?: any;
  extra_cate?: any;
}
