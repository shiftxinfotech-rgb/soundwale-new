// utils/dropdown.ts
import {DropDownListParams} from '@data';

export const normalizeOptions = (options: any[]): DropDownListParams[] => {
  return options.map(opt => {
    // Check if already DropDownListParams
    if ('label' in opt && 'value' in opt) {
      return opt as DropDownListParams;
    }

    // Transform generic object
    return {
      label:
        opt.label || opt.name || opt.title || String(opt.value || opt.id || ''),
      value: opt.value ?? opt.id ?? opt.label ?? opt.name ?? '',
      ...opt, // preserve extra properties
    };
  });
};
