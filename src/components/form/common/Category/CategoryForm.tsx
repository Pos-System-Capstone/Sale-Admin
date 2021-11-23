import React, { useMemo } from 'react';
import { Box, Grid, Slider, Typography } from '@mui/material';
import { CheckBoxField, DraftEditorField, InputField, UploadImageField } from 'components/form';
import useLocales from 'hooks/useLocales';
import { Controller, useFormContext } from 'react-hook-form';
import TreeViewField, { RenderTree } from 'components/form/TreeViewField/TreeViewField';
import useCategories from 'hooks/categories/useCategories';
import { TCategory } from 'types/category';
import { DraftEditor } from 'components/editor';

interface Props {}

const CategoryForm = (props: Props) => {
  const { translate } = useLocales();
  const { watch } = useFormContext();
  const { data: categories } = useCategories({ 'only-root': true });

  const categoryTreeData = useMemo<RenderTree[]>(() => {
    const generateTree: any = (category: TCategory) => {
      if (!category.childs || category.childs.length === 0) {
        return {
          id: category.cate_id,
          name: category.cate_name,
          children: []
        };
      }
      return {
        id: category.cate_id,
        name: category.cate_name,
        children: category.childs.map(generateTree)
      };
    };

    return (
      categories?.map((c) => ({
        id: `${c.cate_id}`,
        name: c.cate_name,
        children: c?.childs.map(generateTree)
      })) ?? []
    );
  }, [categories]);

  const checkIsNotRootCategory = (id: string) => {
    const cate = categories?.find((c) => c.cate_id === Number(id));
    if (!cate) return true;
    return !cate.is_container;
  };

  const [isExtra, isRoot, is_container] = watch(['is_extra', 'is_root', 'is_container']);

  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <CheckBoxField name="is_container" label="Đây không phải danh mục chứa sản phẩm" />
      </Grid>
      <Grid item xs={6}>
        {!is_container && <CheckBoxField name="is_extra" label="Đây là Danh mục extra" />}
      </Grid>
      <Grid item xs={12} sm={12} sx={{ textAlign: 'left' }}>
        <Box>
          <UploadImageField.Avatar name="pic_url" label={translate('categories.table.thumbnail')} />
        </Box>
      </Grid>
      {/* <Grid item xs={12} sm={6}>
        <InputField fullWidth label="Thứ tự" name="position" />
      </Grid> */}

      <Grid item xs={12} sm={6}>
        <InputField fullWidth name="cate_name" label={translate('categories.table.cateName')} />
      </Grid>
      <Grid item xs={12} sm={6}>
        <InputField
          fullWidth
          name="cate_name_eng"
          label={translate('categories.table.cateNameEn')}
        />
      </Grid>
      <Grid item xs={12}>
        <Controller
          name="description"
          render={({ field }) => {
            return <DraftEditorField value={field.value} onChange={field.onChange} />;
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <CheckBoxField name="is_root" label="Đây là Danh mục gốc" />
      </Grid>
      {!isRoot && (
        <Grid item xs={12}>
          <Typography mb={2}>Danh mục cha</Typography>
          <Controller
            name="parent_cate_id"
            render={({ field }) => (
              <TreeViewField
                onDisabled={checkIsNotRootCategory}
                data={categoryTreeData}
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
        </Grid>
      )}
    </Grid>
  );
};

const marks = [
  {
    value: 0,
    label: 'Đầu tiền'
  },
  {
    value: 100,
    label: 'Cuối cùng'
  }
];

export default CategoryForm;
