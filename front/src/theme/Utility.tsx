import {Scale} from '@util';
import {TextStyle, ViewStyle} from 'react-native';

type Range<
  N extends number,
  Acc extends number[] = [],
> = Acc['length'] extends N ? Acc[number] : Range<N, [...Acc, Acc['length']]>;
type RangeWithDecimal =
  | '0_0'
  | '0_1'
  | '0_2'
  | '0_3'
  | '0_4'
  | '0_5'
  | '0_6'
  | '0_7'
  | '0_8'
  | '0_9'
  | '1_0';
let rangeValue: number = 40;
type RangeTill = Range<40>;

type MarginKeys = `m${'' | 'l' | 'r' | 't' | 'b' | 'v' | 'h'}_${RangeTill}`;
type PaddingKeys = `p${'' | 'l' | 'r' | 't' | 'b' | 'v' | 'h'}_${RangeTill}`;
type GapKeys = `gap_${RangeTill}`;
type FontSizeKeys = `fs_${RangeTill}`;
type LineHeightKeys = `lh_${RangeTill}`;
type LetterSpacingKeys = `ls_${RangeWithDecimal}`;
type BorderRadiusKeys =
  | `br_${RangeTill}`
  | `brt_${RangeTill}`
  | `brr_${RangeTill}`
  | `brb_${RangeTill}`
  | `brl_${RangeTill}`;
type FlexKeys = `flex_${0 | 1}`;
type FlexDirectionKeys = `fd_${'row' | 'column'}`;
type AlignSelfKeys = `as_${
  | 'auto'
  | 'start'
  | 'center'
  | 'end'
  | 'stretch'
  | 'baseline'}`;
type FlexWrapKeys = `fw_${'wrap' | 'nowrap' | 'wrap_reverse'}`;
type JustifyContentKeys = `jc_${
  | 'start'
  | 'center'
  | 'end'
  | 'space_between'
  | 'space_around'
  | 'space_evenly'}`;
type AlignItemsKeys = `ai_${
  | 'start'
  | 'center'
  | 'end'
  | 'stretch'
  | 'baseline'}`;
type TextDecorationKeys = `td_${
  | 'none'
  | 'underline'
  | 'line_through'
  | 'underline_line_through'}`;
type TextDecorationStyleKeys = `tds_${
  | 'solid'
  | 'double'
  | 'dotted'
  | 'dashed'}`;
type TextAlignKeys = `ta_${'left' | 'center' | 'right' | 'justify'}`;
type TextAlignVerticalKeys = `tav_${'top' | 'center' | 'bottom'}`;
type TextTransformKeys = `tt_${'uppercase' | 'lowercase' | 'capitalize'}`;
type BorderWidthKeys =
  | `bw_${RangeTill}`
  | `bwt_${RangeTill}`
  | `bwr_${RangeTill}`
  | `bwb_${RangeTill}`
  | `bwl_${RangeTill}`;
type HeightKeys = `h_${RangeTill}`;
type WidthKeys = `w_${RangeTill}`;

type SharedStyleKeys = MarginKeys | PaddingKeys | BorderRadiusKeys | FlexKeys;
type ViewStyleKeys =
  | SharedStyleKeys
  | GapKeys
  | AlignSelfKeys
  | FlexWrapKeys
  | JustifyContentKeys
  | AlignItemsKeys
  | FlexDirectionKeys
  | BorderWidthKeys
  | HeightKeys
  | WidthKeys;
type TextStyleKeys =
  | SharedStyleKeys
  | FontSizeKeys
  | LineHeightKeys
  | LetterSpacingKeys
  | TextDecorationKeys
  | TextAlignKeys
  | TextAlignVerticalKeys
  | TextTransformKeys
  | TextDecorationStyleKeys;
type ViewDynamicStyles = {[key in ViewStyleKeys]: ViewStyle};
type TextDynamicStyles = {[key in TextStyleKeys]: TextStyle};

const generateDynamicStyles = <T,>(
  range: number,
  styleGenerator: (value: number) => Partial<T>,
): T => {
  const styles: Partial<T> = {};
  for (let i = 0; i <= range; i++) {
    Object.assign(styles, styleGenerator(i));
  }
  return styles as T;
};

const createBorderWidthStyles = (
  value: number,
): Partial<ViewDynamicStyles> => ({
  [`bw_${value}`]: {borderWidth: Scale(value)},
  [`bwt_${value}`]: {borderTopWidth: Scale(value)},
  [`bwr_${value}`]: {borderRightWidth: Scale(value)},
  [`bwb_${value}`]: {borderBottomWidth: Scale(value)},
  [`bwl_${value}`]: {borderLeftWidth: Scale(value)},
});

const createFlexStyles = (): Partial<ViewDynamicStyles> => ({
  flex_0: {flex: 0},
  flex_1: {flex: 1},
});

const createFlexDirectionStyles = (): Partial<ViewDynamicStyles> => ({
  fd_row: {flexDirection: 'row'},
  fd_column: {flexDirection: 'column'},
});

const createAlignSelfStyles = (): Partial<ViewDynamicStyles> => ({
  as_auto: {alignSelf: 'auto'},
  as_start: {alignSelf: 'flex-start'},
  as_center: {alignSelf: 'center'},
  as_end: {alignSelf: 'flex-end'},
  as_stretch: {alignSelf: 'stretch'},
  as_baseline: {alignSelf: 'baseline'},
});

const createFlexWrapStyles = (): Partial<ViewDynamicStyles> => ({
  fw_wrap: {flexWrap: 'wrap'},
  fw_nowrap: {flexWrap: 'nowrap'},
  fw_wrap_reverse: {flexWrap: 'wrap-reverse'},
});

const createJustifyContentStyles = (): Partial<ViewDynamicStyles> => ({
  jc_start: {justifyContent: 'flex-start'},
  jc_center: {justifyContent: 'center'},
  jc_end: {justifyContent: 'flex-end'},
  jc_space_between: {justifyContent: 'space-between'},
  jc_space_around: {justifyContent: 'space-around'},
  jc_space_evenly: {justifyContent: 'space-evenly'},
});

const createAlignItemsStyles = (): Partial<ViewDynamicStyles> => ({
  ai_start: {alignItems: 'flex-start'},
  ai_center: {alignItems: 'center'},
  ai_end: {alignItems: 'flex-end'},
  ai_stretch: {alignItems: 'stretch'},
  ai_baseline: {alignItems: 'baseline'},
});

const createTextDecorationStyles = (): Partial<TextDynamicStyles> => ({
  td_none: {textDecorationLine: 'none'},
  td_underline: {textDecorationLine: 'underline'},
  td_line_through: {textDecorationLine: 'line-through'},
  td_underline_line_through: {textDecorationLine: 'underline line-through'},
});

const createTextAlignStyles = (): Partial<TextDynamicStyles> => ({
  ta_left: {textAlign: 'left'},
  ta_center: {textAlign: 'center'},
  ta_right: {textAlign: 'right'},
  ta_justify: {textAlign: 'justify'},
});

const createTextAlignVerticalStyles = (): Partial<TextDynamicStyles> => ({
  tav_top: {textAlignVertical: 'top'},
  tav_center: {textAlignVertical: 'center'},
  tav_bottom: {textAlignVertical: 'bottom'},
});

const createTextDecorationStyleStyles = (): Partial<TextDynamicStyles> => ({
  tds_solid: {textDecorationStyle: 'solid'},
  tds_double: {textDecorationStyle: 'double'},
  tds_dotted: {textDecorationStyle: 'dotted'},
  tds_dashed: {textDecorationStyle: 'dashed'},
});

const createTextTransformStyles = (): Partial<TextDynamicStyles> => ({
  tt_uppercase: {textTransform: 'uppercase'},
  tt_lowercase: {textTransform: 'lowercase'},
  tt_capitalize: {textTransform: 'capitalize'},
});

const createBorderRadiusStyles = (
  value: number,
): Partial<ViewDynamicStyles> => ({
  [`br_${value}`]: {borderRadius: Scale(value)},
  [`brt_${value}`]: {borderTopLeftRadius: Scale(value)},
  [`brr_${value}`]: {borderTopRightRadius: Scale(value)},
  [`brb_${value}`]: {borderBottomRightRadius: Scale(value)},
  [`brl_${value}`]: {borderBottomLeftRadius: Scale(value)},
});

const createMarginStyles = (value: number): Partial<ViewDynamicStyles> => ({
  [`m_${value}`]: {margin: Scale(value)},
  [`ml_${value}`]: {marginLeft: Scale(value)},
  [`mr_${value}`]: {marginRight: Scale(value)},
  [`mt_${value}`]: {marginTop: Scale(value)},
  [`mb_${value}`]: {marginBottom: Scale(value)},
  [`mv_${value}`]: {marginVertical: Scale(value)},
  [`mh_${value}`]: {marginHorizontal: Scale(value)},
});

const createPaddingStyles = (value: number): Partial<ViewDynamicStyles> => ({
  [`p_${value}`]: {padding: Scale(value)},
  [`pl_${value}`]: {paddingLeft: Scale(value)},
  [`pr_${value}`]: {paddingRight: Scale(value)},
  [`pt_${value}`]: {paddingTop: Scale(value)},
  [`pb_${value}`]: {paddingBottom: Scale(value)},
  [`pv_${value}`]: {paddingVertical: Scale(value)},
  [`ph_${value}`]: {paddingHorizontal: Scale(value)},
});

const createGapStyles = (value: number): Partial<ViewDynamicStyles> => ({
  [`gap_${value}`]: {gap: Scale(value)},
});

const createFontSizeStyles = (value: number): Partial<TextDynamicStyles> => ({
  [`fs_${value}`]: {fontSize: Scale(value)},
});

const createLineHeightStyles = (value: number): Partial<TextDynamicStyles> => ({
  [`lh_${value}`]: {lineHeight: Scale(value)},
});

const generateLetterSpacingStyles = (): TextDynamicStyles => {
  const styles: Partial<TextDynamicStyles> = {};
  const decimals = [0.0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0];

  decimals.forEach(value => {
    const formattedValue = value.toFixed(1).replace('.', '_');
    const positiveKey = `ls_${formattedValue}` as LetterSpacingKeys;
    styles[positiveKey] = {letterSpacing: value};
  });

  return styles as TextDynamicStyles;
};

const createHeightStyles = (value: number): Partial<ViewDynamicStyles> => ({
  [`h_${value}`]: {height: Scale(value)},
});

const createWidthStyles = (value: number): Partial<ViewDynamicStyles> => ({
  [`w_${value}`]: {width: Scale(value)},
});

// Generate styles
const sharedStyles = {
  ...generateDynamicStyles(rangeValue, createMarginStyles),
  ...generateDynamicStyles(rangeValue, createPaddingStyles),
};

const flexStyles = createFlexStyles();
const flexDirectionStyles = createFlexDirectionStyles();
const alignSelfStyles = createAlignSelfStyles();
const flexWrapStyles = createFlexWrapStyles();
const gapStyles = generateDynamicStyles(rangeValue, createGapStyles);
const fontSizeStyles = generateDynamicStyles(rangeValue, createFontSizeStyles);
const lineHeightStyles = generateDynamicStyles(
  rangeValue,
  createLineHeightStyles,
);
const letterSpaceStyles = generateLetterSpacingStyles();
const borderRadiusStyles = generateDynamicStyles(
  rangeValue,
  createBorderRadiusStyles,
);
const borderWidthStyles = generateDynamicStyles(
  rangeValue,
  createBorderWidthStyles,
);

const textAlignStyles = createTextAlignStyles();
const textAlignVerticalStyles = createTextAlignVerticalStyles();
const textTransformStyles = createTextTransformStyles();
const justifyContentStyles = createJustifyContentStyles();
const alignItemsStyles = createAlignItemsStyles();
const textDecorationStyles = createTextDecorationStyles();
const textDecorationStyleStyles = createTextDecorationStyleStyles();

const heightStyles = generateDynamicStyles(rangeValue, createHeightStyles);
const widthStyles = generateDynamicStyles(rangeValue, createWidthStyles);

const viewStyles: ViewDynamicStyles = {
  ...sharedStyles,
  ...gapStyles,
  ...borderRadiusStyles,
  ...justifyContentStyles,
  ...alignItemsStyles,
  ...flexStyles,
  ...flexDirectionStyles,
  ...alignSelfStyles,
  ...flexWrapStyles,
  ...borderWidthStyles,
  ...heightStyles,
  ...widthStyles,
};

const textStyles: TextDynamicStyles = {
  ...sharedStyles,
  ...fontSizeStyles,
  ...lineHeightStyles,
  ...letterSpaceStyles,
  ...textAlignStyles,
  ...textTransformStyles,
  ...textDecorationStyles,
  ...textDecorationStyleStyles,
  ...textAlignVerticalStyles,
};

export {textStyles as TS, viewStyles as VS};
