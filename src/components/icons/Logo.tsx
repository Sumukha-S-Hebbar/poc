import type { SVGProps } from 'react';

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg 
      width="40" 
      height="40" 
      viewBox="0 0 40 40" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
        <circle cx="20" cy="20" r="20" fill="#DC2626"/>
        <path d="M20 10C22.6667 10 25 11.6 25 14C25 16.4 22.6667 18 20 18C17.3333 18 15 16.4 15 14C15 11.6 17.3333 10 20 10Z" fill="white"/>
        <path d="M12 16V18C12 22.4183 15.5817 26 20 26C24.4183 26 28 22.4183 28 18V16L25 17V18C25 21.3137 22.7614 24 20 24C17.2386 24 15 21.3137 15 18V17L12 16Z" fill="white"/>
        <path d="M20 27V30" stroke="white" strokeWidth="2" strokeLinecap="round"/>
        <path d="M12 21L10 22" stroke="white" strokeWidth="2" strokeLinecap="round"/>
        <path d="M28 21L30 22" stroke="white" strokeWidth="2" strokeLinecap="round"/>
    </svg>

  );
}
