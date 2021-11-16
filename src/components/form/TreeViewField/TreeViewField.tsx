import { TreeItem, TreeView } from '@mui/lab';
import { Checkbox, FormControlLabel, Radio } from '@mui/material';
import { union } from 'lodash';
import {
  MinusSquare,
  PlusSquare,
  CloseSquare,
  StyledTreeItem
} from 'pages/Products/components/CreateProduct.styles';
import { useEffect, useState } from 'react';

type Props = {
  multiple?: boolean;
  data?: RenderTree[];
  value?: any[] | any;
  onChange?: (updatedValue: any[] | any) => any;
};

const sample: RenderTree[] = [
  {
    id: '0',
    name: 'Parent',
    children: [
      {
        id: '1',
        name: 'Child - 1'
      },
      {
        id: '3',
        name: 'Child - 3',
        children: [
          {
            id: '4',
            name: 'Child - 4',
            children: [
              {
                id: '7',
                name: 'Child - 7'
              },
              {
                id: '8',
                name: 'Child - 8'
              }
            ]
          }
        ]
      },
      {
        id: '5',
        name: 'Child - 5',
        children: [
          {
            id: '6',
            name: 'Child - 6'
          }
        ]
      }
    ]
  },
  {
    id: '7',
    name: 'Paren2 - 2',
    children: [
      {
        id: '8',
        name: 'Child - 8',
        children: [
          {
            id: '9',
            name: 'Child - 9'
          },
          {
            id: '10',
            name: 'Child - 10'
          }
        ]
      }
    ]
  }
];

export default function TreeViewField({ data = sample, value, onChange, multiple }: Props) {
  const [selected, setSelected] = useState<any[] | any>(() => {
    if (value) return value;
    return multiple ? [] : null;
  });

  const controlledValue = value ?? selected;

  const onChangeValue = (updateValue: any) => {
    if (onChange) {
      onChange(updateValue);
    } else {
      setSelected(updateValue);
    }
  };

  function getDefaultExpand() {
    let array: string[] = [];

    for (let index = 0; index < data?.length; index++) {
      const node = data[index];
      const childs = getChildById(node, node.id);
      const childHasSelected = multiple
        ? union(controlledValue, childs).length !== 0
        : childs.some((v) => v === controlledValue);
      if (childHasSelected) {
        array.push(node.id);
      }
    }

    return array;
  }

  function getChildById(node: RenderTree, id: string) {
    let array: string[] = [];

    function getAllChild(nodes: RenderTree | null) {
      if (nodes === null) return [];
      array.push(nodes.id);
      if (Array.isArray(nodes.children)) {
        nodes.children.forEach((node) => {
          array = [...array, ...getAllChild(node)];
          array = array.filter((v, i) => array.indexOf(v) === i);
        });
      }
      return array;
    }

    function getNodeById(nodes: RenderTree, id: string) {
      if (nodes.id === id) {
        return nodes;
      } else if (Array.isArray(nodes.children)) {
        let result = null;
        nodes.children.forEach((node) => {
          if (!!getNodeById(node, id)) {
            result = getNodeById(node, id);
          }
        });
        return result;
      }

      return null;
    }

    return getAllChild(getNodeById(node, id));
  }

  function getOnChange(checked: boolean, nodes: RenderTree) {
    if (!multiple) {
      onChangeValue(checked ? nodes.id : null);
      return;
    }

    let array = checked
      ? [...controlledValue, nodes.id]
      : controlledValue.filter((value: any) => value !== nodes.id);

    onChangeValue(array);
  }

  const renderTree = (nodes: RenderTree) => {
    const checked = multiple
      ? controlledValue.some((item: any) => `${item}` == nodes.id)
      : nodes.id == `${controlledValue}`;
    const Control = multiple ? Checkbox : Radio;

    const childs = getChildById(nodes, nodes.id);
    const childHasSelected = multiple
      ? union(controlledValue, childs).length !== 0
      : childs.some((v) => v === controlledValue);

    return (
      <StyledTreeItem
        key={`${nodes.id}`}
        defaultChecked={childHasSelected}
        nodeId={`${nodes.id}`}
        label={
          <FormControlLabel
            control={
              <Control
                defaultChecked={checked}
                checked={checked}
                onChange={(event) => getOnChange(event.currentTarget.checked, nodes)}
                onClick={(e) => e.stopPropagation()}
              />
            }
            label={<>{nodes.name}</>}
          />
        }
      >
        {Array.isArray(nodes.children) ? nodes.children.map((node) => renderTree(node)) : null}
      </StyledTreeItem>
    );
  };

  const defaultExpanded = getDefaultExpand();
  console.log(`defaultExpanded`, defaultExpanded);
  return (
    <TreeView
      defaultExpanded={defaultExpanded}
      expanded={defaultExpanded}
      defaultCollapseIcon={<MinusSquare />}
      defaultExpandIcon={<PlusSquare />}
      defaultEndIcon={<CloseSquare />}
      sx={{ height: 300, flexGrow: 1, overflowY: 'auto' }}
    >
      {data.map((d) => renderTree(d))}
    </TreeView>
  );
}

export type RenderTree = {
  id: string;
  name: string;
  children?: RenderTree[];
};
