import type { VariantProps } from 'class-variance-authority'
import type * as React from 'react'
import { Button, type buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface IconButtonProps
  extends React.ComponentProps<'button'>,
    VariantProps<typeof buttonVariants> {
  label: string
}

function IconButton({
  label,
  className,
  variant = 'ghost',
  ...props
}: IconButtonProps) {
  return (
    <Button
      variant={variant}
      size="icon"
      aria-label={label}
      className={cn('shrink-0', className)}
      {...props}
    />
  )
}

export { IconButton }
