/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Book } from './types';

export const BOOKS: Book[] = [
  {
    id: '1',
    title: 'The Silent Echo',
    author: 'Elena Vance',
    cover: 'https://picsum.photos/seed/book1/400/600',
    category: 'Fiction',
    rating: 4.8,
    description: 'A haunting tale of memory and loss in a forgotten coastal town.',
    isNew: true,
    matchRate: 95,
    year: 2025,
    maturityRating: '16+',
    length: '400 pages',
    genres: ['Fiction', 'Mystery', 'Drama']
  },
  {
    id: '2',
    title: 'Quantum Horizons',
    author: 'Dr. Marcus Chen',
    cover: 'https://picsum.photos/seed/book2/400/600',
    category: 'Science',
    rating: 4.9,
    description: 'Exploring the boundaries of reality through the lens of modern physics.',
    isNew: true,
    matchRate: 98,
    year: 2025,
    maturityRating: 'All',
    length: '320 pages',
    genres: ['Science', 'Physics', 'Educational']
  },
  {
    id: '3',
    title: 'The Gilded Cage',
    author: 'Sarah J. Maas',
    cover: 'https://picsum.photos/seed/book3/400/600',
    category: 'Fantasy',
    rating: 4.7,
    description: 'A kingdom on the brink of war, and a thief who holds the key to its survival.',
    matchRate: 92,
    year: 2024,
    maturityRating: '18+',
    length: '520 pages',
    genres: ['Fantasy', 'Romance', 'Adventure']
  },
  {
    id: '4',
    title: 'Beyond the Veil',
    author: 'Julian Thorne',
    cover: 'https://picsum.photos/seed/book4/400/600',
    category: 'Mystery',
    rating: 4.5,
    description: 'When a detective discovers a secret society, he must choose between truth and safety.',
    matchRate: 89,
    year: 2024,
    maturityRating: '16+',
    length: '380 pages',
    genres: ['Mystery', 'Thriller', 'Noir']
  },
  {
    id: '5',
    title: 'The Last Alchemist',
    author: 'Isabella Rossi',
    cover: 'https://picsum.photos/seed/book5/400/600',
    category: 'Historical',
    rating: 4.6,
    description: 'In the heart of Renaissance Italy, a young woman discovers the secrets of the ancients.',
    matchRate: 91,
    year: 2024,
    maturityRating: '13+',
    length: '450 pages',
    genres: ['Historical', 'Fiction', 'Adventure']
  },
  {
    id: '6',
    title: 'Digital Dreams',
    author: 'Alex Rivera',
    cover: 'https://picsum.photos/seed/book6/400/600',
    category: 'Sci-Fi',
    rating: 4.4,
    description: 'In a world where memories can be uploaded, one man seeks the truth about his past.',
    matchRate: 85,
    year: 2023,
    maturityRating: '16+',
    length: '310 pages',
    genres: ['Sci-Fi', 'Cyberpunk', 'Thriller']
  }
];

export const CATEGORIES = ['All', 'Fiction', 'Science', 'Fantasy', 'Mystery', 'Historical', 'Sci-Fi'];
