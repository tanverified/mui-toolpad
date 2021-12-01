import * as React from 'react';
import { TextField as TextFieldComponent, TextFieldProps } from '@mui/material';
import type { StudioComponentDefinition } from '../types';

const TextField: StudioComponentDefinition<TextFieldProps> = {
  Component: React.memo(TextFieldComponent),
  props: {
    label: { type: 'string', defaultValue: '' },
    variant: {
      type: 'TextFieldVariant',
      defaultValue: 'outlined',
    },
    value: {
      type: 'string',
      defaultValue: '',
      onChangeProp: 'onChange',
      onChangeTransform: (event: React.ChangeEvent<HTMLInputElement>) => event.target.value,
      onChangeEventHandler: (setStateIdentifier) =>
        `(event) => ${setStateIdentifier}(event.target.value)`,
    },
  },
  render(context, node, resolvedProps) {
    context.addImport('@mui/material', 'TextField', 'TextField');
    return `
      <TextField ${context.renderRootProps(node.id)} ${context.renderProps(resolvedProps)} />
    `;
  },
};

export default TextField;