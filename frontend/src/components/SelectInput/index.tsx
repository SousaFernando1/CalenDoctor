// @ts-nocheck
import {
  CircularProgress,
  MenuItem,
  Stack,
  TextField,
  TextFieldProps,
} from '@mui/material';
import { ChangeEvent, forwardRef } from 'react';

export const SELECT_MENU_ITEMS_MAX_HEIGHT = 300;

type ValueObject = {
  id: number;
  [key: string]: any;
};

type Value = number | string | boolean | ValueObject;

export type SelectInputItem = {
  value: Value;
  label: string;
  [key: any]: any;
};

type Props = TextFieldProps & {
  menuItems: SelectInputItem[];
  loading?: boolean;
  objectValue?: boolean;
  customKey?: string;
};

export const SelectInput = forwardRef(function SelectInput(
  {
    customKey,
    objectValue,
    menuItems,
    defaultValue,
    required,
    loading,
    name,
    onChange,
    onBlur,
    value,
    ...rest
  }: Props,
  ref,
) {
  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    if (objectValue) {
      const objectData = {
        target: {
          name,
          value: JSON.parse(event.target.value),
        },
      };

      onChange(objectData);
      return;
    }

    const data = {
      target: {
        name,
        value: event.target.value,
      },
    };

    onChange(data);
  };

  const handleGetValue = (data: any) => {
    if (typeof data === 'object') {
      return JSON.stringify(data);
    }

    return data;
  };

  const handleGetItemKeyAndValue = (item: SelectInputItem) => {
    if (customKey) {
      return {
        key: item[customKey],
        value: item[customKey],
      };
    }

    if (typeof item.value === 'object') {
      return {
        key: item.value.id,
        value: JSON.stringify(item.value),
      };
    }

    return {
      key: item.value,
      value: item.value,
    };
  };

  const handleRenderLoading = () => {
    if (!loading) return;

    return (
      <Stack alignItems="center" py="1rem">
        <CircularProgress size="1.6rem" color="inherit" />
      </Stack>
    );
  };

  return (
    <TextField
      {...rest}
      ref={ref}
      select
      value={handleGetValue(value) ?? ''}
      defaultValue={handleGetValue(defaultValue) ?? ''}
      onChange={handleChange}
      onBlur={onBlur}
      InputLabelProps={{
        required,
      }}
      SelectProps={{
        MenuProps: {
          style: {
            maxHeight: SELECT_MENU_ITEMS_MAX_HEIGHT,
          },
        },
      }}
    >
      {menuItems.map((item: SelectInputItem) => {
        const { key, value } = handleGetItemKeyAndValue(item);

        return (
          <MenuItem key={String(key)} value={value}>
            {item.label}
          </MenuItem>
        );
      })}

      {handleRenderLoading()}
    </TextField>
  );
});
