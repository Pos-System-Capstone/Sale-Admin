import React, { useMemo } from 'react';
import { Box, Grid, Slider, Typography } from '@mui/material';
import { CheckBoxField, DraftEditorField, InputField, UploadImageField } from 'components/form';
import useLocales from 'hooks/useLocales';
import { Controller } from 'react-hook-form';
import TreeViewField, { RenderTree } from 'components/form/TreeViewField/TreeViewField';
import useCategories from 'hooks/categories/useCategories';
import { TCategory } from 'types/category';
import { DraftEditor } from 'components/editor';

interface Props {}

const CategoryForm = (props: Props) => {
  const { translate } = useLocales();

  const { data: categories } = useCategories();

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

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <CheckBoxField name="is_available" label="Hiển thị trên web" />
      </Grid>
      <Grid item xs={12} sm={6} sx={{ textAlign: 'left' }}>
        <Box>
          <UploadImageField.Avatar name="pic_url" label={translate('categories.table.thumbnail')} />
        </Box>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Box px={4}>
          <Typography>Thứ tự xuất hiện</Typography>
          <Controller
            name="position"
            render={({ field }) => (
              <Slider
                sx={{ width: '100%' }}
                aria-label="Custom marks"
                defaultValue={0}
                step={1}
                valueLabelDisplay="auto"
                marks={marks}
                {...field}
              />
            )}
          />
        </Box>
      </Grid>

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
        <Typography mb={2}>Phân mục cha</Typography>
        <Controller
          name="parent_cate_id"
          render={({ field }) => (
            <TreeViewField data={categoryTreeData} value={field.value} onChange={field.onChange} />
          )}
        />
      </Grid>
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
