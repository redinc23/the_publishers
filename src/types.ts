/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Book {
  id: string;
  title: string;
  author: string;
  cover: string;
  category: string;
  rating: number;
  description: string;
  isNew?: boolean;
  matchRate?: number;
  year?: number;
  maturityRating?: string;
  length?: string;
  genres?: string[];
}

export type TabType = 'home' | 'catalog' | 'portal' | 'audiobooks' | 'about';
