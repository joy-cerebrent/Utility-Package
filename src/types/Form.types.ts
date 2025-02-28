import React from "react";
import { useForm } from "react-hook-form";
import { LucideIcon } from "lucide-react";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "destructive" | "outline" | "transparent";
  size?: "sm" | "md" | "lg";
};

export type CheckboxProps = {
  title: string;
  description?: string;
  checked: boolean;
  error?: string;
  onChange: (checked: boolean) => void;
};

export type ConfirmPasswordMatchProps = {
  password: string;
  confirmPassword: string
};

export type DatePickerProps = {
  label: string;
  error?: string;
  onChange: (date: Date | undefined) => void;
  value?: Date;
};

export type DropdownProps = {
  label: string;
  options: string[];
  value: string;
  disabled?: boolean;
  leftIcon?: LucideIcon;
  enableSearch?: boolean;
  error?: string;
  onChange: (value: string) => void;
};

export type ProgressBarProps = {
  steps: {
    id: string;
    name: string
  }[];
  currentStep: number;
}

export type InputFieldProps = {
  label: string;
  type: string;
  placeholder: string;
  leftIcon?: LucideIcon;
  rightIcon?: LucideIcon;
  error?: string;
  registration: ReturnType<ReturnType<typeof useForm>["register"]>;
};

export type TextareaProps = {
  label: string;
  placeholder: string;
  rows?: number;
  error?: string;
  registration: ReturnType<ReturnType<typeof useForm>["register"]>;
};