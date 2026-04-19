import { ArrowDownUp } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import type { Category, SortBy } from '@/lib/types'

const sortOptions: Array<{ label: string; value: SortBy }> = [
  { label: 'Price: Low to high', value: 'price-asc' },
  { label: 'Price: High to low', value: 'price-desc' },
  { label: 'Name: A to Z', value: 'name-asc' },
]

export function FilterBar({
  activeCategoryId,
  categories,
  onSortChange,
  sortBy,
}: {
  activeCategoryId: string | null
  categories: Category[]
  onSortChange: (value: SortBy) => void
  sortBy: SortBy
}) {
  return (
    <Card>
      <CardContent className="flex flex-col gap-4 p-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-1 flex-wrap gap-2">
          <Button asChild size="sm" variant={activeCategoryId === null ? 'secondary' : 'outline'}>
            <Link to="/">All categories</Link>
          </Button>
          {categories.map((category) => (
            <Button
              asChild
              key={category.id}
              size="sm"
              variant={activeCategoryId === category.id ? 'secondary' : 'outline'}
            >
              <Link to={`/category/${category.id}`}>{category.name}</Link>
            </Button>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-sm font-medium text-slate-600">
            <ArrowDownUp className="size-4" />
            Sort by
          </div>
          <Select onValueChange={(value) => onSortChange(value as SortBy)} value={sortBy}>
            <SelectTrigger className="w-[220px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  )
}
