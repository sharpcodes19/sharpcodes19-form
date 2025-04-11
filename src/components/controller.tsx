"use client"

import React, { ReactElement } from "react"
import {
	FieldValues,
	Path,
	Controller,
	ControllerRenderProps,
	ControllerFieldState,
	UseFormStateReturn,
	Control,
	ControllerProps
} from "react-hook-form"

type ControlRenderProps<T extends FieldValues, K extends Path<T>> = {
	field: ControllerRenderProps<T, K>
	fieldState: ControllerFieldState
	formState: UseFormStateReturn<T>
}

type BaseFormControllerProps<T extends FieldValues, K extends Path<T>> = {
	name: K
	control: Control<T>
	children: (consume: ControlRenderProps<T, K>) => ReactElement
}

// prettier-ignore
export type FormControllerProps<T extends FieldValues, K extends Path<T>> = 
  Omit<ControllerProps<T, K>, keyof BaseFormControllerProps<T, K> | "render"> & BaseFormControllerProps<T, K>

// prettier-ignore
export const FormController = <T extends FieldValues, K extends Path<T>>({ children, ...props }: FormControllerProps<T, K>) => {
  return (
    <Controller
      {...props}
      render={({ field, fieldState, formState }) =>
        children({ field, fieldState, formState })
      }
    />
  )
}
