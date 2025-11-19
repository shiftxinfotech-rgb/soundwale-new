export type OtherProfileUserInfo = {
  id: number;
  name: string;
  role: string;
  image_url: string;
  mobile_number: string;
};

export type OtherProfileScreenParams = {
  userId: number;
  userInfo: OtherProfileUserInfo;
  onReturnBack?: () => void;
};
