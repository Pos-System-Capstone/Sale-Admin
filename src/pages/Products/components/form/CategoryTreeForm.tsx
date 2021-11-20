import { ErrorMessage } from '@hookform/error-message';
import { Typography } from '@mui/material';
import TreeViewField, { RenderTree } from 'components/form/TreeViewField/TreeViewField';
import useCategories from 'hooks/categories/useCategories';
import React, { useMemo } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { TCategory } from 'types/category';

interface Props {}

const CategoryTreeForm = (props: Props) => {
  const {
    formState: { errors }
  } = useFormContext();
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
    <>
      <ErrorMessage
        errors={errors}
        name="cat_id"
        render={({ message }) => (
          <Typography color="red" variant="caption">
            {message}
          </Typography>
        )}
      />
      <Controller
        name="cat_id"
        render={({ field }) => <TreeViewField data={categoryTreeData} {...field} />}
      />
    </>
  );
};

export default CategoryTreeForm;
