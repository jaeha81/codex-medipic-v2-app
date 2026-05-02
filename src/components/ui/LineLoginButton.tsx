'use client'

import type { ButtonHTMLAttributes } from 'react'

interface LineLoginButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean
  fullWidth?: boolean
}

/** LINE 公式グリーン (#07B53B) のログイン / アクションボタン */
export function LineLoginButton({
  onClick,
  children,
  loading = false,
  disabled = false,
  fullWidth = false,
  className = '',
  ...rest
}: LineLoginButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={[
        'inline-flex items-center justify-center gap-2',
        'px-8 py-4 text-lg rounded-xl font-semibold text-white',
        'transition-all duration-150 active:scale-[0.98]',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
        'focus-visible:ring-[#07B53B]',
        'disabled:opacity-50 disabled:cursor-not-allowed select-none shadow-sm',
        loading || disabled
          ? 'bg-[#07B53B]'
          : 'bg-[#07B53B] hover:bg-[#06A034]',
        fullWidth ? 'w-full' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...rest}
    >
      {loading ? (
        /* スピナー */
        <svg
          className="w-5 h-5 animate-spin"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          />
        </svg>
      ) : (
        /* LINE 公式アイコン (SVG inline) */
        <svg
          className="w-5 h-5 flex-shrink-0"
          viewBox="0 0 48 48"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path d="M24 4C12.95 4 4 12.07 4 22.05c0 5.94 3.08 11.22 7.88 14.63l-1.8 6.6a.5.5 0 00.7.59l7.52-3.9A21.3 21.3 0 0024 40.1c11.05 0 20-8.07 20-18.05S35.05 4 24 4zm-6.5 23.5h-2.75a.75.75 0 01-.75-.75V18a.75.75 0 011.5 0v8h2a.75.75 0 010 1.5zm4.25 0a.75.75 0 01-1.5 0V18a.75.75 0 011.5 0v9.5zm8.25 0a.75.75 0 01-.57-.27l-4-5.23V26.75a.75.75 0 01-1.5 0V18a.75.75 0 011.32-.49l4 5.23V18a.75.75 0 011.5 0v8.75a.75.75 0 01-.75.75zm5.25 0H32.5a.75.75 0 01-.75-.75V18a.75.75 0 01.75-.75h2.75a.75.75 0 010 1.5H33.25v2.5h2a.75.75 0 010 1.5h-2v2.5h2a.75.75 0 010 1.5z" />
        </svg>
      )}
      {children}
    </button>
  )
}
