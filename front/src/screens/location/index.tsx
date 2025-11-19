import {CommonHeader, Container, SmartShimmerFlatList} from '@components';
import {ExtractedAddress, NavigationParamStack, StateBean} from '@data';
import {useToggleSnackBar} from '@hooks';
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {useLazyGetFilterDataQuery} from '@services';
import {AppStyle, VS} from '@theme';
import {
  enableLocationServices,
  extractCityStateCountry,
  getAddressFromCoordinates,
  getCurrentLocation,
  requestLocationPermission,
} from '@util';
import React, {useCallback, useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import LocationItem from './components/LocationItem';
import LocationItemShimmer from './components/LocationItemShimmer';
import SearchCurrentLocation from './components/SearchCurrentLocation';

let filteredCities: StateBean[] | undefined = [];
type RouteProps = RouteProp<NavigationParamStack, 'Location'>;

let extractedAddress: ExtractedAddress = {
  country: '',
  state: '',
  city: '',
  postalCode: '',
};

export default function Location() {
  const {t} = useTranslation('generic');
  const {toggleMessage} = useToggleSnackBar();
  const {goBack, addListener} =
    useNavigation<NavigationProp<NavigationParamStack>>();
  const {requestFrom, onGoBack, type} = useRoute<RouteProps>().params;
  const [searchTerms, setSearchTerms] = useState('');
  const [getFilters, {isFetching, isLoading, data: filterData}] =
    useLazyGetFilterDataQuery();

  const [selectedLocation, setSelectedLocation] = useState(-1);

  const selectLocationAndGoBack = useCallback(
    (city: StateBean, index: number) => {
      setSelectedLocation(index);
      goBack();
      onGoBack?.({id: city.id, state_name: city.state_name});
    },
    [onGoBack, goBack],
  );

  const validateLocationPermission = useCallback(async () => {
    try {
      const hasPermission = await requestLocationPermission();
      if (!hasPermission) {
        return;
      }

      const isLocationEnabled = await enableLocationServices();
      if (!isLocationEnabled) {
        return;
      }
      const location = await getCurrentLocation();
      const results = await getAddressFromCoordinates(location);
      if (results !== undefined && results !== null) {
        extractedAddress = extractCityStateCountry(results.address_components);
        console.log('extractedAddress', extractedAddress);
        goBack();
        onGoBack?.({
          latitude: location.latitude,
          longitude: location.longitude,
          state_name: extractedAddress.state ?? '',
        });
      } else {
        toggleMessage(t('errorGettingCurrentLocation'));
      }
    } catch (error) {
      toggleMessage(t('errorGettingCurrentLocation'));
    }
  }, [goBack, onGoBack, t, toggleMessage]);

  useEffect(() => {
    const unsubscribe = addListener('focus', () => {
      getFilters(`type=${type}`);
    });
    return () => unsubscribe();
  }, [addListener, getFilters, type]);

  const _renderLocationItem = useCallback(
    ({item, index}: {item: StateBean; index: number}) => {
      return (
        <LocationItem
          key={index}
          onPressItem={() => selectLocationAndGoBack(item, index)}
          item={item.state_name ?? ''}
          selectedLocation={selectedLocation === index}
        />
      );
    },
    [selectLocationAndGoBack, selectedLocation],
  );

  const _renderItemShimmer = useCallback(({index}: {index: number}) => {
    return <LocationItemShimmer key={index} />;
  }, []);

  return (
    <Container>
      <CommonHeader
        title={t('location')}
        withBackArrow
        withChatNotification={false}
        onPressBack={() => {
          if (requestFrom === 'buyer' || requestFrom === 'directory') {
            if (selectedLocation !== -1) {
              const city = filterData?.states?.[selectedLocation];
              selectLocationAndGoBack(city!, selectedLocation);
            } else {
              goBack();
            }
          } else {
            goBack();
          }
        }}
      />
      <SearchCurrentLocation
        onChangeText={text => {
          filteredCities = filterData?.states?.filter(city =>
            city?.state_name?.toLowerCase().includes(text.toLowerCase()),
          );
          setSearchTerms(text);
        }}
        onPressCurrentLocation={validateLocationPermission}
      />
      <SmartShimmerFlatList
        data={
          searchTerms !== '' ? filteredCities ?? [] : filterData?.states ?? []
        }
        isLoading={isLoading}
        isRefetching={isFetching}
        showShimmerWhileRefetching={true}
        isFetchingMore={false}
        hasMore={false}
        renderItem={_renderLocationItem}
        renderShimmerItem={_renderItemShimmer}
        contentContainerStyle={[AppStyle.flexGrow]}
        style={[VS.flex_1]}
      />
    </Container>
  );
}
