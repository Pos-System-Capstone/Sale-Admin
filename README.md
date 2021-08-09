# Sale admin

## Product module

- [ ] Tạo **dòng sản phẩm**
- [ ] Tạo biến thể cho **dòng sản phẩm**
- [ ] Điều chỉnh **biến thể**

```
variants
{
    optName: '',
    values: []
}

-> Products matrix [[a,c],[b,c]]
-> Product Cbn



child_products [
    {
        atts: [a,c]
    }
]

-> remove [b,c]

```

## Typescript

`Type` cho phép client có thể bỏ thêm các addtional prop

```ts
type TypeSupportAdditionProp {
    requireProp: string;
    optionalProp?: number;
    [k: string]: any; // support addition
}

```
