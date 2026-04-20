'use client';

import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  baseUrl: string;
  category?: string;
  material?: string;
  size?: string;
}

export function Pagination({ 
  totalPages, 
  currentPage, 
  baseUrl,
  category,
  material,
  size,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const createPageUrl = (page: number) => {
    const params = new URLSearchParams();
    if (category) params.set('category', category);
    if (material) params.set('material', material);
    if (size) params.set('size', size);
    params.set('page', page.toString());
    return `${baseUrl}?${params.toString()}`;
  };

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav className="flex justify-center items-center gap-2 mt-12 mb-20" aria-label="Пагинация">
      {/* Previous Page */}
      <Link
        href={createPageUrl(Math.max(1, currentPage - 1))}
        className={cn(
          "flex items-center justify-center w-[44px] h-[44px] rounded-md border border-primary/20 hover:bg-primary/5 transition-colors",
          currentPage === 1 && "pointer-events-none opacity-30"
        )}
        aria-label="Предыдущая страница"
      >
        <ChevronLeft size={20} className="text-primary" />
      </Link>

      {/* Page Numbers */}
      {pages.map((page) => (
        <Link
          key={page}
          href={createPageUrl(page)}
          className={cn(
            "flex items-center justify-center w-[44px] h-[44px] rounded-md border transition-all font-body text-sm",
            currentPage === page 
              ? "bg-primary text-white border-primary shadow-md" 
              : "border-primary/20 hover:bg-primary/5 text-primary"
          )}
          aria-current={currentPage === page ? "page" : undefined}
        >
          {page}
        </Link>
      ))}

      {/* Next Page */}
      <Link
        href={createPageUrl(Math.min(totalPages, currentPage + 1))}
        className={cn(
          "flex items-center justify-center w-[44px] h-[44px] rounded-md border border-primary/20 hover:bg-primary/5 transition-colors",
          currentPage === totalPages && "pointer-events-none opacity-30"
        )}
        aria-label="Следующая страница"
      >
        <ChevronRight size={20} className="text-primary" />
      </Link>
    </nav>
  );
}
