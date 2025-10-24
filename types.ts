
import type React from 'react';

export type Platform = 'mostaql' | 'upwork';

export interface Step {
  label: string;
  amount: number;
  icon: React.ReactNode;
  isFinalUSD?: boolean;
  isFinalEGP?: boolean;
  notes?: string;
}
