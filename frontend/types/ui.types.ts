import { ReactNode } from 'react';
import { User } from './auth.types';

export interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'danger' | 'success';
  disabled?: boolean;
  className?: string;
}

export interface InputProps {
  id?: string;
  name?: string;
  type?: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  min?: number;
  max?: number;
  minLength?: number;
  className?: string;
}

export interface LabelProps {
  htmlFor?: string;
  children: ReactNode;
  required?: boolean;
  className?: string;
}

export interface SelectProps {
  id?: string;
  name?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: ReadonlyArray<{ value: string; label: string }>;
  placeholder?: string;
  required?: boolean;
  className?: string;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

export interface ConfirmationModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  title?: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  confirmVariant?: 'primary' | 'secondary' | 'danger' | 'success';
}

export interface AlertProps {
  type?: 'error' | 'warning' | 'success' | 'info';
  children: ReactNode;
  className?: string;
}

export interface FormFieldInputProps {
  id: string;
  label: string;
  type?: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  min?: number;
  max?: number;
  minLength?: number;
  error?: string;
}

export interface FormFieldSelectProps {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: ReadonlyArray<{ value: string; label: string }>;
  placeholder?: string;
  required?: boolean;
  error?: string;
}

export type FormFieldProps = FormFieldInputProps | FormFieldSelectProps;

export interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export interface HeaderProps {
  user: User | null;
  onLogout: () => void;
  navigationItems?: Array<{ label: string; href: string }>;
}

export interface AuthLayoutProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
}

export interface PageLayoutProps {
  user: User | null;
  onLogout: () => void;
  children: ReactNode;
  navigationItems?: Array<{ label: string; href: string }>;
}

