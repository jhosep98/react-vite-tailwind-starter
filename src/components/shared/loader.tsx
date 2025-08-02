import { DotSpinner } from 'ldrs/react'
import type * as React from 'react'

import 'ldrs/react/DotSpinner.css'

export const Loader: React.FC = () => (
  <DotSpinner size="40" speed="0.9" color="inherit" />
)
