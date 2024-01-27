import { join } from 'path'

import { CONTENT_DIR, EDIT_CONTENT_URL } from '@/lib/constants'

export const getEditPath = (relativePath: string): string => {
    const trimmedContentUrl = EDIT_CONTENT_URL.replace(/\/+$/, '');
    const trimmedContentDir = CONTENT_DIR.replace(/\/+$/, '');
    const normalizedPath = relativePath.replace(/^\/+/, '');
    return `${trimmedContentUrl}/${trimmedContentDir}/${normalizedPath}/index.md`;
  };