'use client';

import {
  Box,
  createListCollection,
  Portal,
  Select,
  SelectContent,
  SelectItem,
  SelectItemIndicator,
  SelectRoot,
  SelectTrigger,
  SelectValueChangeDetails,
  SelectValueText
} from '@chakra-ui/react';
import { useLocale } from 'next-intl';

import { usePathname, useRouter } from 'src/i18n/routing';

const localeList = createListCollection({
  items: [
    { value: 'en', label: 'English' },
    { value: 'ko', label: '한국어' }
  ]
});

export default function SelectLocale() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const onChangeLocale = ({
    value
  }: SelectValueChangeDetails<{ value: string; label: string }>) => {
    if (value[0] !== locale) {
      router.push({ pathname }, { locale: value[0] });
    }
  };
  return (
    <Box>
      <SelectRoot
        collection={localeList}
        size="sm"
        w="100px"
        defaultValue={[locale]}
        onValueChange={onChangeLocale}
      >
        <SelectTrigger justifyContent="center" cursor="pointer">
          <SelectValueText />
        </SelectTrigger>
        <Portal>
          <Select.Positioner>
            <SelectContent>
              {localeList.items.map((item) => (
                <SelectItem key={item.value} item={item.value} cursor="pointer">
                  {item.label}
                  <SelectItemIndicator />
                </SelectItem>
              ))}
            </SelectContent>
          </Select.Positioner>
        </Portal>
      </SelectRoot>
    </Box>
  );
}
