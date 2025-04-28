import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Cn Helper
 *
 * Helper for merging class names
 *
 * @param {ClassValue[]} inputs - The class values to merge
 * @returns {string} The merged class names
 */
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}
