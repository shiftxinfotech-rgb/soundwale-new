import {useGoogleAutocomplete} from '@appandflow/react-native-google-autocomplete';
import {Icons} from '@assets';
import {InputBox, Text} from '@components';
import {ExtractedAddress, NavigationParamStack} from '@data';
import {GOOGLE_MAP_API_KEY} from '@env';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {Colors, CommonStyle, TS, VS} from '@theme';
import {
  coordsDefault,
  enableLocationServices,
  extractCityStateCountry,
  getCurrentLocation,
  hexToRgbA,
  LocationDelta,
  requestLocationPermission,
  setField,
} from '@util';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  Keyboard,
  Platform,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  View,
} from 'react-native';
import Geocoder from 'react-native-geocoding';
import MapView, {
  Circle,
  Details,
  LatLng,
  Marker,
  MarkerDragStartEndEvent,
  Region,
} from 'react-native-maps';
import {ActivityIndicator} from 'react-native-paper';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {Styles} from './Styles';
import AddressSelectionView from './components/AddressSelectionView';
import UseCurrentLocationView from './components/UseCurrentLocationView';

type RouteProps = RouteProp<NavigationParamStack, 'LocationSelector'>;

Geocoder.init(GOOGLE_MAP_API_KEY);

let extractedAddress: ExtractedAddress = {
  country: '',
  state: '',
  city: '',
  postalCode: '',
};

export default function LocationSelector() {
  const {t} = useTranslation(['generic']);
  const navigation = useNavigation();
  const {params} = useRoute<RouteProps>();
  const {onGoBack} = params || {};
  const mapRef = useRef<MapView>(null);
  const hasUserDraggedMarker = useRef(false);

  const opacity = useSharedValue(0);
  const translateY = useSharedValue(1000);
  const currentLocationTranslateY = useSharedValue(180);

  const [mapCoordinates, setMapCoordinates] = useState<LatLng>(coordsDefault);
  const [markerCoords, setMarkerCoords] = useState<LatLng>(coordsDefault);
  const [accuracy, setAccuracy] = useState<number>(0);
  const [inputTerm, setInputTerm] = useState<string>('');
  const [pickedAddress, setPickedAddress] = useState<{
    fullAddress: string;
    title: string;
    coordinates: LatLng;
  }>({
    fullAddress: '',
    title: '',
    coordinates: coordsDefault,
  });

  const {locationResults, setTerm, isSearching, clearSearch, searchError} =
    useGoogleAutocomplete(GOOGLE_MAP_API_KEY, {
      debounce: 600,
      queryTypes: 'geocode|establishment',
      minLength: 3,
    });

  // Debounce effect
  useEffect(() => {
    const timer = setTimeout(() => {
      if (inputTerm.length >= 3) {
        setTerm(inputTerm);
      }
    }, 600);
    return () => clearTimeout(timer);
  }, [inputTerm, setTerm]);

  const animateBottomView = useCallback(
    (show: boolean) => {
      opacity.value = withTiming(show ? 1 : 0, {duration: 300});
      translateY.value = withTiming(show ? 0 : 1000, {duration: 300});
      currentLocationTranslateY.value = withTiming(show ? 0 : 180, {
        duration: 300,
      });
    },
    [opacity, translateY, currentLocationTranslateY],
  );

  const handleLocationResponse = useCallback(
    (response: Geocoder.GeocoderResponse) => {
      const {results} = response || {};
      if (
        results !== undefined &&
        results !== null &&
        Array.isArray(results) &&
        results?.length > 0
      ) {
        const firstItem = results[0];
        const {formatted_address, geometry, address_components} = firstItem;
        const {location, viewport} = geometry || {};
        const {lat, lng} = location;

        extractedAddress = extractCityStateCountry(
          firstItem.address_components,
        );

        const title = address_components.find(el =>
          el.types.includes('locality'),
        );
        let newRegion: {
          latitude: number;
          longitude: number;
          latitudeDelta: number;
          longitudeDelta: number;
        } = {latitude: 0, longitude: 0, latitudeDelta: 0, longitudeDelta: 0};
        setPickedAddress(old => ({
          ...old,
          fullAddress: formatted_address,
          title: title?.long_name || '',
          coordinates: {
            latitude: lat,
            longitude: lng,
          },
        }));
        animateBottomView(true);

        setMapCoordinates(old => ({...old, latitude: lat, longitude: lng}));
        setMarkerCoords(old => ({...old, latitude: lat, longitude: lng}));

        if (viewport) {
          newRegion = {
            latitude: (viewport.northeast.lat + viewport.southwest.lat) / 2,
            longitude: (viewport.northeast.lng + viewport.southwest.lng) / 2,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          };
        } else {
          newRegion = {
            latitude: lat,
            longitude: lng,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          };
        }
        setTimeout(() => {
          mapRef?.current?.animateToRegion(newRegion, 1000);
        }, 1000);
      }
    },
    [animateBottomView],
  );

  const onFetchAddressFromLocation = useCallback(
    (location: LatLng) => {
      Geocoder.from({
        latitude: location.latitude,
        longitude: location.longitude,
      })
        .then((json: Geocoder.GeocoderResponse) => {
          handleLocationResponse(json);
        })
        .catch(() => {});
    },
    [handleLocationResponse],
  );

  const getAndSetCurrentLocation = useCallback(async () => {
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
      setMapCoordinates(old => ({...old, ...location, ...LocationDelta}));
      setMarkerCoords(old => ({...old, ...location, ...LocationDelta}));
      setAccuracy(100);
      onFetchAddressFromLocation(location);
      setTimeout(() => {
        if (mapRef.current) {
          mapRef.current.animateToRegion(
            {
              ...location,
              ...LocationDelta,
            },
            1000,
          );
        }
      }, 1000);
    } catch (error) {}
  }, [onFetchAddressFromLocation]);

  useEffect(() => {
    getAndSetCurrentLocation();
  }, [getAndSetCurrentLocation]);

  const onDragComplete = useCallback(
    (event: MarkerDragStartEndEvent) => {
      if (event?.nativeEvent?.coordinate) {
        hasUserDraggedMarker.current = true;
        const {coordinate} = event.nativeEvent;
        setMarkerCoords(old => ({...old, ...coordinate}));
        setAccuracy(100);
        onFetchAddressFromLocation(coordinate);
      }
    },
    [onFetchAddressFromLocation],
  );

  const onChangeRegionComplete = useCallback(
    (region: Region, details: Details) => {
      if (details.isGesture) {
        setMapCoordinates(old => ({
          ...old,
          latitude: region.latitude,
          longitude: region.longitude,
        }));
      }
    },
    [],
  );

  const onMapPress = useCallback(
    (event: any) => {
      console.log('Coords', event?.nativeEvent?.coordinate);
      if (event?.nativeEvent?.coordinate) {
        hasUserDraggedMarker.current = true;
        const {coordinate} = event.nativeEvent;
        setMarkerCoords(old => ({...old, ...coordinate}));
        setAccuracy(100);
        onFetchAddressFromLocation(coordinate);
      }
    },
    [onFetchAddressFromLocation],
  );

  const currentLocationAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateY: currentLocationTranslateY.value}],
      zIndex: 2,
    };
  });

  const handleConfirmLocation = useCallback(() => {
    animateBottomView(false);
    navigation.goBack();
    onGoBack?.({
      coordinates: markerCoords,
      address: {
        ...extractedAddress,
        fullAddress: pickedAddress.fullAddress,
      },
    });
  }, [animateBottomView, navigation, onGoBack, markerCoords, pickedAddress]);

  const handleCurrentLocationPress = useCallback(() => {
    hasUserDraggedMarker.current = false;
    getAndSetCurrentLocation();
  }, [getAndSetCurrentLocation]);

  const onFetchLocationFromAddress = useCallback(
    (address: string) => {
      Geocoder.from(address)
        .then((json: Geocoder.GeocoderResponse) => {
          handleLocationResponse(json);
        })
        .catch(() => {});
    },
    [handleLocationResponse],
  );

  return (
    <View style={[VS.flex_1, CommonStyle.mainContainer]}>
      {Platform.OS === 'android' && (
        <StatusBar
          backgroundColor={'transparent'}
          translucent
          barStyle="dark-content"
        />
      )}

      <MapView
        ref={mapRef}
        followsUserLocation={true}
        showsBuildings={true}
        showsCompass={true}
        showsIndoors={true}
        showsUserLocation={true}
        showsMyLocationButton={false}
        userInterfaceStyle="light"
        userLocationPriority="high"
        userLocationUpdateInterval={5000}
        rotateEnabled={false}
        pitchEnabled={false}
        onMarkerDragEnd={onDragComplete}
        onLongPress={onDragComplete}
        onPress={onMapPress}
        onUserLocationChange={event => {
          if (hasUserDraggedMarker.current) {
            return;
          }
          const coordinate = event.nativeEvent.coordinate;
          if (coordinate) {
            setMarkerCoords({
              latitude: coordinate.latitude,
              longitude: coordinate.longitude,
            });
            setAccuracy(coordinate.accuracy || 100);
          }
        }}
        initialRegion={{
          ...mapCoordinates,
          ...LocationDelta,
        }}
        style={[VS.flex_1]}
        onRegionChangeComplete={onChangeRegionComplete}>
        {accuracy > 0 &&
          markerCoords &&
          [0.16, 0.3, 0.9].map((el, index) => (
            <Circle
              key={index}
              center={markerCoords}
              radius={accuracy - index * (accuracy / 3)}
              strokeColor="transparent"
              fillColor={hexToRgbA(Colors.primary, `${el}`)}
            />
          ))}
        <Marker.Animated
          coordinate={{...markerCoords, ...LocationDelta}}
          tracksViewChanges={true}
          draggable={true}
          anchor={{x: 0.5, y: 0.5}}
        />
      </MapView>

      <View
        style={[
          Styles.absoluteHeader,
          VS.ph_15,
          CommonStyle.bgWhite,
          VS.pb_10,
        ]}>
        <View style={[VS.fd_row, VS.ai_center, CommonStyle.safeAreaSpaceTop]}>
          <TouchableOpacity
            style={VS.mr_22}
            hitSlop={20}
            activeOpacity={1}
            onPress={() => navigation.goBack()}>
            <Icons.ArrowBack />
          </TouchableOpacity>
          <Text
            fontWeight="semiBold"
            numberOfLines={1}
            ellipsizeMode={'tail'}
            style={[TS.fs_20, TS.lh_24, CommonStyle.textBlack]}>
            {t('selectLocation')}
          </Text>
        </View>
        <InputBox
          placeholder={t('searchLocation')}
          value={inputTerm}
          onChangeText={setInputTerm}
          inputMode={'text'}
          keyboardType={'default'}
          maxLength={100}
          parentStyle={VS.mt_10}
          returnKeyType={'search'}
          renderLeftIcon={<Icons.Search />}
        />
        {inputTerm.length > 0 && (
          <ScrollView
            style={[VS.mt_2]}
            keyboardShouldPersistTaps="handled"
            keyboardDismissMode="interactive"
            contentContainerStyle={[
              VS.gap_10,
              VS.pt_10,
              VS.pb_15,
              Styles.locationContainer,
            ]}>
            {isSearching ? (
              <View style={[VS.ai_center, VS.as_center, VS.jc_center]}>
                <ActivityIndicator />
              </View>
            ) : searchError ? (
              <Text
                numberOfLines={1}
                ellipsizeMode={'tail'}
                style={[TS.fs_12, CommonStyle.textBlack]}>
                {t('somethingWrong')}
              </Text>
            ) : (
              locationResults.map((el, li) => {
                return (
                  <View key={li}>
                    <TouchableOpacity
                      style={[VS.ph_10]}
                      onPress={() => {
                        clearSearch();
                        setInputTerm('');
                        Keyboard.dismiss();
                        onFetchLocationFromAddress(el.description);
                      }}
                      activeOpacity={1}>
                      <Text
                        numberOfLines={2}
                        ellipsizeMode={'tail'}
                        style={[TS.fs_12, TS.lh_22, CommonStyle.textBlack]}>
                        {setField(el?.description)}
                      </Text>
                    </TouchableOpacity>
                    {li < locationResults.length - 1 && (
                      <View style={[VS.mv_5, Styles.lineSeparator]} />
                    )}
                  </View>
                );
              })
            )}
          </ScrollView>
        )}
      </View>

      <View style={[Styles.selectedLocationView, VS.gap_11]}>
        <Animated.View
          style={[
            VS.ai_center,
            VS.jc_center,
            VS.as_center,
            currentLocationAnimatedStyle,
          ]}>
          <UseCurrentLocationView onPress={handleCurrentLocationPress} />
        </Animated.View>
        <AddressSelectionView
          address={pickedAddress}
          onConfirm={handleConfirmLocation}
        />
      </View>
    </View>
  );
}
