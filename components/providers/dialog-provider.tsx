'use client'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import {
  AlertCircle,
  AlertTriangle,
  CheckCircle2,
  Info,
  type LucideIcon,
  XCircle,
} from 'lucide-react'
import * as React from 'react'

export type DialogType = 'alert' | 'confirm' | 'custom'
export type DialogIconType =
  | 'info'
  | 'success'
  | 'warning'
  | 'error'
  | 'question'

export interface DialogButton {
  label: string
  variant?:
    | 'default'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | 'link'
  onClick?: () => void | Promise<void>
}

export interface DialogOptions {
  type?: DialogType
  title?: string
  description?: string | React.ReactNode
  confirmText?: string
  cancelText?: string
  confirmVariant?:
    | 'default'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | 'link'
  content?: React.ReactNode
  buttons?: DialogButton[]
  onConfirm?: () => void | Promise<void>
  onCancel?: () => void | Promise<void>
  icon?: DialogIconType | React.ReactNode
  iconClassName?: string
  className?: string
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '4xl' | 'full'
}

interface DialogContextValue {
  showDialog: (options: DialogOptions) => Promise<boolean>
  alert: (
    title: string,
    description?: string | React.ReactNode,
    options?: Partial<DialogOptions>,
  ) => Promise<void>
  confirm: (
    title: string,
    description?: string | React.ReactNode,
    options?: Partial<DialogOptions>,
  ) => Promise<boolean>
  hideDialog: () => void
}

const DialogContext = React.createContext<DialogContextValue | null>(null)

export function DialogProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = React.useState(false)
  const [dialogOptions, setDialogOptions] = React.useState<DialogOptions>({})
  const resolveRef = React.useRef<((value: boolean) => void) | null>(null)

  const showDialog = React.useCallback(
    (options: DialogOptions): Promise<boolean> => {
      return new Promise((resolve) => {
        resolveRef.current = resolve
        setDialogOptions(options)
        setIsOpen(true)
      })
    },
    [],
  )

  const hideDialog = React.useCallback(() => {
    setIsOpen(false)
    if (resolveRef.current) {
      resolveRef.current(false)
      resolveRef.current = null
    }
  }, [])

  const alert = React.useCallback(
    (
      title: string,
      description?: string | React.ReactNode,
      options?: Partial<DialogOptions>,
    ): Promise<void> => {
      return showDialog({
        type: 'alert',
        title,
        description,
        confirmText: 'OK',
        ...options,
      }).then(() => undefined)
    },
    [showDialog],
  )

  const confirm = React.useCallback(
    (
      title: string,
      description?: string | React.ReactNode,
      options?: Partial<DialogOptions>,
    ): Promise<boolean> => {
      return showDialog({
        type: 'confirm',
        title,
        description,
        confirmText: 'Confirm',
        cancelText: 'Cancel',
        ...options,
      })
    },
    [showDialog],
  )

  const handleConfirm = React.useCallback(async () => {
    if (dialogOptions.onConfirm) {
      await dialogOptions.onConfirm()
    }
    setIsOpen(false)
    if (resolveRef.current) {
      resolveRef.current(true)
      resolveRef.current = null
    }
  }, [dialogOptions])

  const handleCancel = React.useCallback(async () => {
    if (dialogOptions.onCancel) {
      await dialogOptions.onCancel()
    }
    setIsOpen(false)
    if (resolveRef.current) {
      resolveRef.current(false)
      resolveRef.current = null
    }
  }, [dialogOptions])

  const handleOpenChange = React.useCallback(
    (open: boolean) => {
      if (!open) {
        handleCancel()
      }
    },
    [handleCancel],
  )

  const value = React.useMemo(
    () => ({ showDialog, alert, confirm, hideDialog }),
    [showDialog, alert, confirm, hideDialog],
  )

  const getIconComponent = (
    iconType: DialogIconType,
  ): { Icon: LucideIcon; className: string } => {
    switch (iconType) {
      case 'success':
        return { Icon: CheckCircle2, className: 'text-green-500' }
      case 'error':
        return { Icon: XCircle, className: 'text-red-500' }
      case 'warning':
        return { Icon: AlertTriangle, className: 'text-yellow-500' }
      case 'question':
        return { Icon: AlertCircle, className: 'text-blue-500' }
      case 'info':
      default:
        return { Icon: Info, className: 'text-blue-500' }
    }
  }

  const getSizeClassName = (
    size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '4xl' | 'full',
  ) => {
    switch (size) {
      case 'sm':
        return 'sm:max-w-sm'
      case 'md':
        return 'sm:max-w-md'
      case 'lg':
        return 'sm:max-w-lg'
      case 'xl':
        return 'sm:max-w-xl'
      case '2xl':
        return 'sm:max-w-2xl'
      case '4xl':
        return 'sm:max-w-4xl'
      case 'full':
        return 'sm:max-w-full'
      default:
        return '' // Use default AlertDialog size
    }
  }

  const renderIcon = () => {
    const { icon, iconClassName } = dialogOptions
    if (!icon) return null

    if (typeof icon === 'string') {
      const { Icon, className } = getIconComponent(icon as DialogIconType)
      return (
        <div className="mb-4 flex justify-center">
          <Icon className={`h-6 w-6 ${iconClassName || className}`} />
        </div>
      )
    }

    return <div className="mb-4 flex justify-center">{icon}</div>
  }

  const renderContent = () => {
    const {
      type = 'confirm',
      title,
      description,
      content,
      buttons,
      confirmText,
      cancelText,
      confirmVariant,
    } = dialogOptions

    // if (content) {
    //   return content
    // }

    return (
      <>
        <AlertDialogHeader>
          <div className="flex gap-2">
            {renderIcon()}
            {title && <AlertDialogTitle>{title}</AlertDialogTitle>}
          </div>
          {description && (
            <AlertDialogDescription>
              {typeof description === 'string' ? description : description}
            </AlertDialogDescription>
          )}
        </AlertDialogHeader>
        {content && <div className="my-1">{content}</div>}
        <AlertDialogFooter>
          {type === 'confirm' && (
            <AlertDialogCancel onClick={handleCancel}>
              {cancelText || 'Cancel'}
            </AlertDialogCancel>
          )}
          {buttons && buttons.length > 0 ? (
            buttons.map((button, index) => (
              <AlertDialogAction
                key={index}
                onClick={async () => {
                  if (button.onClick) {
                    await button.onClick()
                  }
                  handleConfirm()
                }}
                className={button.variant ? `variant-${button.variant}` : ''}
              >
                {button.label}
              </AlertDialogAction>
            ))
          ) : (
            <AlertDialogAction
              onClick={handleConfirm}
              className={
                confirmVariant === 'destructive'
                  ? 'bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60'
                  : ''
              }
            >
              {confirmText || 'OK'}
            </AlertDialogAction>
          )}
        </AlertDialogFooter>
      </>
    )
  }

  const contentClassName = React.useMemo(() => {
    const sizeClass = getSizeClassName(dialogOptions.size)
    const customClass = dialogOptions.className || ''
    return [sizeClass, customClass].filter(Boolean).join(' ')
  }, [dialogOptions.size, dialogOptions.className])

  return (
    <DialogContext.Provider value={value}>
      {children}
      <AlertDialog open={isOpen} onOpenChange={handleOpenChange}>
        <AlertDialogContent className={contentClassName}>
          {renderContent()}
        </AlertDialogContent>
      </AlertDialog>
    </DialogContext.Provider>
  )
}

export function useDialog() {
  const context = React.useContext(DialogContext)
  if (!context) {
    throw new Error('useDialog must be used within a DialogProvider')
  }
  return context
}
