export interface FirestoreTimestamp {
  seconds: number;
  nanoseconds: number;
}

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  photoUrl: string;
  createdAt: FirestoreTimestamp;
  updatedAt: FirestoreTimestamp;
}

export type SocialProvider = 'kakao' | 'naver' | 'google';
