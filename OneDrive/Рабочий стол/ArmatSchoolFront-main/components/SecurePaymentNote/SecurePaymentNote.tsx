import type { ReactNode } from 'react';
import { ShieldIcon } from '../icons/Icons';

export default function SecurePaymentNote({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-end  gap-3 pt-5">
      <ShieldIcon className="flex-none text-orange-500 text-primary" />
      <p className="m-0 text-sm leading-[21px] text-muted">{children}</p>
    </div>
  );
}
