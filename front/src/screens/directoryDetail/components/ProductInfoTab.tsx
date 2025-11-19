import {NoData, Text} from '@components';
import {
  DealerCompanyParams,
  DirectoryDetail,
  SelectedCompanyParams,
  SelectedProductParams,
} from '@data';
import {CommonStyle, TS, VS} from '@theme';
import {Scale, setField, validField} from '@util';
import _ from 'lodash';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {View} from 'react-native';
import {checkRole} from './Util';

type ProductInfoTabProps = {
  info: DirectoryDetail;
};

export default function ProductInfoTab({info}: ProductInfoTabProps) {
  const {t} = useTranslation(['generic']);
  const {roles} = info;

  const {
    product_info,
    companies_info,
    category_info,
    dealer_of_company,
    distributor_of_company,
    importer_of_company,
  } = info || {};

  const haveProductInfo = validField(product_info);
  const haveCompaniesInfo = validField(companies_info);
  const haveCategoryInfo = validField(category_info);

  const haveDealerOfCompany = validField(dealer_of_company);
  const haveDistributorOfCompany = validField(distributor_of_company);
  const haveImporterOfCompany = validField(importer_of_company);

  const isDealer = checkRole(roles || [], [
    'dealer_supplier_distributor_importer',
  ]);

  if (
    !haveProductInfo &&
    !haveCompaniesInfo &&
    !haveCategoryInfo &&
    isDealer &&
    !haveDealerOfCompany &&
    !haveDistributorOfCompany &&
    !haveImporterOfCompany
  ) {
    return <NoData message={t('noInformationFound')} />;
  }

  const productInfo = haveProductInfo ? JSON.parse(product_info!) : [];
  const categories = haveCategoryInfo ? JSON.parse(category_info!) : [];
  const companies = haveCompaniesInfo ? JSON.parse(companies_info!) : [];
  const dealerCompanies = haveDealerOfCompany
    ? JSON.parse(dealer_of_company!)
    : [];
  const distributorCompanies = haveDistributorOfCompany
    ? JSON.parse(distributor_of_company!)
    : [];
  const importerCompanies = haveImporterOfCompany
    ? JSON.parse(importer_of_company!)
    : [];
  return (
    <View style={[VS.gap_10]}>
      {haveProductInfo && productInfo.length > 0 ? (
        <View style={[VS.gap_10]}>
          {productInfo?.map((el: any, index: number) => (
            <View
              key={index}
              style={[VS.gap_6, CommonStyle.shadowBoxLight, VS.br_10, VS.p_10]}>
              <RowItem
                label={`${t('product')} : `}
                value={el.product_name || ''}
              />
              <RowItem
                label={`${t('company')} : `}
                value={el.company_name || ''}
              />
              <RowItem label={`${t('model')} : `} value={el.model_name || ''} />
            </View>
          ))}
        </View>
      ) : null}

      {haveCategoryInfo && categories.length > 0 ? (
        <View style={[VS.gap_10]}>
          <CategoryItem
            label={t('product')}
            value={_.sortBy(
              categories?.map((s: SelectedProductParams) =>
                s.category_name.trim(),
              ),
            )
              .map((item, i) => `${i + 1})  ${_.capitalize(item.trim())}`)
              .join('\n')}
          />
        </View>
      ) : null}

      {haveCompaniesInfo && companies.length > 0 ? (
        <CategoryItem
          label={t('company')}
          value={_.sortBy(
            companies?.map((s: SelectedCompanyParams) =>
              s.companies_name.trim(),
            ),
          )
            .map((item, i) => `${i + 1})  ${_.capitalize(item.trim())}`)
            .join('\n')}
        />
      ) : null}
      {haveDealerOfCompany && dealerCompanies.length > 0 ? (
        <CategoryItem
          label={t('dealerOfCompany')}
          value={_.sortBy(
            dealerCompanies?.map((s: DealerCompanyParams) =>
              s.company_name.trim(),
            ),
          )
            .map((item, i) => `${i + 1})  ${_.capitalize(item.trim())}`)
            .join('\n')}
        />
      ) : null}

      {haveDistributorOfCompany && distributorCompanies.length > 0 ? (
        <CategoryItem
          label={t('distributorOfCompany')}
          value={_.sortBy(
            distributorCompanies?.map((s: DealerCompanyParams) =>
              s.company_name.trim(),
            ),
          )
            .map((item, i) => `${i + 1})  ${_.capitalize(item.trim())}`)
            .join('\n')}
        />
      ) : null}
      {haveImporterOfCompany && importerCompanies.length > 0 ? (
        <CategoryItem
          label={t('importerOfCompany')}
          value={_.sortBy(
            importerCompanies?.map((s: DealerCompanyParams) =>
              s.company_name.trim(),
            ),
          )
            .map((item, i) => `${i + 1})  ${_.capitalize(item.trim())}`)
            .join('\n')}
        />
      ) : null}
    </View>
  );
}

const RowItem = ({label, value}: {label: string; value: string}) => {
  return (
    <View style={[VS.fd_row, VS.gap_10, VS.ai_center, VS.flex_1]}>
      <Text
        fontWeight="bold"
        style={[
          TS.fs_16,
          TS.tt_capitalize,
          CommonStyle.textBlack,
          {minWidth: Scale(90)},
        ]}>
        {label}
      </Text>
      <View style={[VS.flex_1]}>
        <Text style={[TS.fs_14, TS.tt_capitalize, CommonStyle.textBlack]}>
          {setField(value)}
        </Text>
      </View>
    </View>
  );
};

const CategoryItem = ({label, value}: {label: string; value: string}) => {
  return (
    <View style={[VS.gap_5]}>
      <Text
        fontWeight="bold"
        style={[TS.fs_16, TS.tt_capitalize, CommonStyle.textBlack]}>
        {label}
      </Text>
      <View style={[CommonStyle.shadowBoxLight, VS.br_10, VS.ph_10, VS.pv_5]}>
        <Text style={[TS.fs_14, TS.tt_capitalize, CommonStyle.textBlack]}>
          {setField(value)}
        </Text>
      </View>
    </View>
  );
};
