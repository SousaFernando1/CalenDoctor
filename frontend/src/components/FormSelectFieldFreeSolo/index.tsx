import {
  CheckboxProps,
  Autocomplete,
  Chip,
  TextField,
  Stack,
} from '@mui/material';
import { SyntheticEvent, useState } from 'react';
import { Control, useController, useFieldArray } from 'react-hook-form';
import { Show } from '../Show';

type Props = CheckboxProps & {
  control: Control<any>;
  name: string;
  label: string;
  disabled?: boolean;
  options: string[];
};

export function FormSelectFieldFreeSolo({
  control,
  name,
  label,
  disabled,
  options,
  required,
}: Readonly<Props>) {
  const [inputValue, setInputValue] = useState('');

  const { fields, append, remove } = useFieldArray({
    control,
    name,
    keyName: 'keyName',
  });

  const {
    fieldState: { error },
  } = useController({
    control,
    name,
  });

  const showTags = (() => {
    return fields.map((item: any, index: number) => (
      <Chip
        key={item?.key}
        variant="outlined"
        label={item?.description}
        onDelete={() => remove(index)}
      />
    ));
  })();

  const onChange = (event: SyntheticEvent, value: string[]) => {
    if (!value.length) return;
    const alreadySelected = fields.findIndex(
      (option: any) => option.description === value[0],
    );

    if (alreadySelected === -1) {
      append({
        description: value[0],
      });
    }

    setInputValue('');
  };

  return (
    <Stack flex={1}>
      <Autocomplete
        fullWidth
        freeSolo
        multiple
        value={[]}
        renderTags={() => null}
        onChange={onChange}
        disabled={disabled}
        options={options}
        onInputChange={(_, newValue) => setInputValue(newValue)}
        inputValue={inputValue}
        renderInput={(params) => (
          <TextField
            {...params}
            fullWidth
            variant="outlined"
            label={label}
            disabled={disabled}
            error={!!error}
            helperText={error?.message ?? ''}
            required={required}
          />
        )}
      />
      <Show.When isTrue={!!fields.length}>
        <Stack mt={1} direction="row" flexWrap="wrap" gap={1}>
          {showTags}
        </Stack>
      </Show.When>
    </Stack>
  );
}
