import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {CompositeNavigationProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AddMemberFormParams, AddMemberScreenParam} from './AddMemberParam';
import {ChatDetailParams} from './ChatDetailsParams';
import {CmsNavigation} from './CmsParams';
import {DirectoryDetailParams, DirectoryNavigation} from './DirectoryParams';
import {
  DealerCompanyScreenParam,
  EditProfileNavigationParams,
} from './EditProfileParams';
import {FilterScreenParams} from './FilterParams';
import {GalleryDetailParams} from './GalleryParams';
import {LocationScreenParams} from './LocationParams';
import {OtherProfileScreenParams} from './OtherProfileParams';
import {
  AddPostRequirementParams,
  PostCommentsParams,
  PostImagesParams,
} from './PostListParams';
import {RegisterParams} from './RegisterParams';
import {SelectLocationScreenParams} from './SelectLocationParams';

export type NavigationParamStack = {
  Splash: undefined;
  Login: undefined;
  Home: undefined;
  Verification: RegisterParams;
  TabNavigator: undefined;
  AddMember: AddMemberScreenParam;
  AddMemberForm: AddMemberFormParams;
  FilterScreen: FilterScreenParams;
  DrawerNavigator: undefined;
  Settings: undefined;
  Cms: CmsNavigation;
  FAQ: undefined;
  Notification: undefined;
  ContactUs: undefined;
  Profile: OtherProfileScreenParams;
  EditProfile: EditProfileNavigationParams;
  Favorite: undefined;
  Location: LocationScreenParams;
  DirectoryList: DirectoryNavigation;
  DirectoryDetail: DirectoryDetailParams;
  GalleryDetail: GalleryDetailParams;
  PostImages: PostImagesParams;
  AddCompanyPdf: undefined;
  CompanyPdfListing: undefined;
  ChatListing: undefined;
  ChatDetail: ChatDetailParams;
  LocationSelector: SelectLocationScreenParams;
  ProductInfoDealerSupplier: EditProfileNavigationParams;
  AddPartInfo: EditProfileNavigationParams;
  ServiceCenter: EditProfileNavigationParams;
  RegisterForm: RegisterParams;
  SoundInventoryUpdate: undefined;
  WorkingWithWhom: undefined;
  OperatingMixerScreen: undefined;
  CompanyDealer: DealerCompanyScreenParam;
  ManufacturingProduct: undefined;
  AddPostRequirement: AddPostRequirementParams;
  PostComments: PostCommentsParams;
};
export type BottomNavigationParamStack = {
  Home: undefined;
  Buyers: undefined;
  Sellers: undefined;
  Directory: undefined;
  Shorts: undefined;
  DirectoryList: DirectoryNavigation;
};

export type BuyersProps = {
  navigation: CompositeNavigationProp<
    BottomTabNavigationProp<BottomNavigationParamStack, 'Buyers'>,
    NativeStackNavigationProp<NavigationParamStack>
  >;
};

export type HomeProps = {
  navigation: CompositeNavigationProp<
    BottomTabNavigationProp<BottomNavigationParamStack, 'Home'>,
    NativeStackNavigationProp<NavigationParamStack>
  >;
};

export type SellersProps = {
  navigation: CompositeNavigationProp<
    BottomTabNavigationProp<BottomNavigationParamStack, 'Sellers'>,
    NativeStackNavigationProp<NavigationParamStack>
  >;
};
