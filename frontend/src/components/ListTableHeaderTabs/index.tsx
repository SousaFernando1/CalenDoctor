import { Stack } from '@mui/material';
import { TabFilterItem } from './TabFilterItem';

type ListTableHeaderProps = {
  tabsConfig: any[];
  currentTab: string;
  onChange: (id: string) => void;
};

export function ListTableHeaderTabs({
  tabsConfig,
  currentTab,
  onChange,
}: Readonly<ListTableHeaderProps>) {
  if (!tabsConfig) return null;

  return (
    <Stack direction="row" bgcolor="grey.200" px="1.5rem" overflow="auto">
      {tabsConfig.map((tabConfig) => (
        <TabFilterItem
          key={tabConfig.id}
          active={tabConfig.id === currentTab}
          tabConfig={tabConfig}
          onClick={() => onChange(tabConfig.id)}
        />
      ))}
    </Stack>
  );
}
