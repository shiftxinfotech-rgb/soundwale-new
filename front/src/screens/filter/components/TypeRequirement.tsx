import {CustomRadioGroup} from '@components';
import {DropDownListParams, RequirementBean} from '@data';
import {VS} from '@theme';
import React, {useEffect, useState} from 'react';
import {View} from 'react-native';

type Props = {
  requirements: RequirementBean[];
  preSelectedId: string | number;
  onSelect: (selectedOption: DropDownListParams) => void;
};

export default function TypeRequirement({
  requirements,
  preSelectedId,
  onSelect,
}: Props) {
  const [selectedValue, setSelectedValue] = useState<string | undefined>();

  const options: DropDownListParams[] = requirements.map(req => ({
    label: req.name ?? '',
    value: req.id !== undefined ? String(req.id) : '',
  }));

  useEffect(() => {
    if (preSelectedId !== undefined && preSelectedId !== null) {
      setSelectedValue(String(preSelectedId));
    }
  }, [preSelectedId]);

  const handleChange = (option: DropDownListParams) => {
    setSelectedValue(option.value);
    onSelect(option);
  };

  return (
    <View style={[VS.flex_1, VS.gap_14, VS.pt_22, VS.ph_18]}>
      <CustomRadioGroup
        options={options}
        value={selectedValue}
        onChange={handleChange}
      />
    </View>
  );
}
