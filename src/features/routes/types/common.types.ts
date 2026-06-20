import type { FirestoreTimestamp } from '@/features/auth/types';

export type { FirestoreTimestamp };

export interface TimestampedDocument {
  createdAt: FirestoreTimestamp;
  updatedAt: FirestoreTimestamp;
}
