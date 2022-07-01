#### `2022-07-01` `Phuoclt:`

###### Report system

- 🔥 Setup and call category api `category.ts` and type `productSaleCategory.ts`, update `column` to call api to resotable
- 🔥 Setup and call product progress api `getProductLine` and type `TProductLineBase`, update `column` to call api to resotable
- 🔥 Setup and call payment api `payment.ts` and type `payment.ts`, update `column` to call api to resotable
- 🛠 Remove `types/report/productProgress.ts` and `types/report/productSale.ts`
- 🆕 Add picker date to ProductProgressReport, ProductSaleReport, Payment component

#### `2022-06-30` `Phuoclt:`

###### Report system

- 🔥 Setup and call overview-report api. Create `revenueOverview.ts` type and `revenue.ts` api
- 🆕 Update `TableCard.tsx` and add loading screen wait api
- 🐞 Fix only call api if user finish pick daterange and disable if api is loading
- 🛠 Update type and name `productSaleReport` section

#### `2022-06-29` `Phuoclt:`

###### Report system

- 🆕 Create `AutocompleteStore.tsx` , hook `useStore` and update `column.ts` to `column.tsx`
- 🆕 Select store with `AutocompleteStore.tsx`

#### `2022-06-28` `Phuoclt:`

###### Report system

- 🐞 Fix date range with default and dont call with null value
- 🛠 Refactor code: remove unused code in overview component

#### `2022-06-27` `Phuoclt:`

###### Report system

- 🌐 Add new format date (`YYYY-MM-DD`)
- 🐞 Fix type params api
- 🆕 Add api store and type api
- 🛠 Refactor code: remove `column.ts` in ProductProgressReport and unused code

#### `2022-06-25` `Phuoclt:`

###### Report system

- 🛠 Refactor code: using the same format function and clear code
- 🌐 Remove a format currency vnd `fCurrencyVN`
- 🌐 Add a new format time only `fTime`

#### `2022-06-24` `Phuoclt:`

###### Report system

- 🆕 Add `productSale.ts` and `productProgress` in type to manage type of productSale and productProgress
- 🛠 Refactor code: create `config.ts` in productSale and productProgress component to manage column Resotable
- 💄 Change the same spacing product and overview component and add tab ui in productSale and productProgress
- 🌐 Create a format currency vnd `fCurrencyVN`

#### `2022-06-22` `Phuoclt:`

###### Report system

- 🆕 Create `products.ts` to call api report sale products
- 🆕 Add filter report sale products with date range
- 🛠 Remove unused file in `src/redux`

#### `2022-06-21` `Phuoclt:`

###### Report system

- 💄 Mock data resotable and overview date month ui
- 🛠 Remove unused code

#### `2022-06-19` `Phuoclt:`

###### Promotion system

- 🆕 Handle submit create promotion with react-hook-form and watch data to preview section

###### Report system

- 💄 Fix UI overview date and optimize table card component
- 🆕 Add new palete (report paletes)

#### `2022-06-17` `Phuoclt:`

- 🌐 Update locale promotion system
- 🔥 Call api get promotion
- 🔥 Create DateTimePickerField component
- 🐞 Change port `env.development` 8000 to 8080 (fix CORS call api promotion)
- 🆕 Update column (add dataIndex) call api promotion
- 🆕 Add field for promotion api type
- 💄 Fix UI StepOne.tsx + StepTwo.tsx create promotion section

#### `2022-06-17` || `TrungLV_[FE]`

- 🐞: Fix `SelectField` in Voucher to filter value in Resotable
- 🆕Change port in `env.development` to 8080
- 🔥 Create `voucher.ts` to get API
- 🛠 Get Api in Voucher

```
💄 for styling
🐞 for bug fix
🔥 for new feature
🆕 for new update of feature
🛠 Refactor
🌐 Locale
🗑 Remove
⚡️ Optimize perf
```
