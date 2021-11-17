import { ModifierForm, TModifier } from 'types/Modifier';

export const transformModifier = (values: ModifierForm) => {
  const data = { ...values };
  if (values.modifiers && values.modifiers.length) {
    data.json_value = JSON.stringify(values.modifiers);
  }
  return data;
};

export const normalizeModifier = (values: TModifier) => {
  const data: Partial<ModifierForm> = { ...values };
  let modifiers = [];

  try {
    const parseModifiers = JSON.parse(values.json_value);
    if (Array.isArray(parseModifiers)) {
      modifiers = parseModifiers;
    }
  } catch (error) {}

  data.modifiers = modifiers;

  return data;
};
