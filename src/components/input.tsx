import { Control, FieldValues, Path } from "react-hook-form"
import { FormController } from "./controller"
import { Input, InputProps } from "@heroui/input"
import { cn } from "@heroui/theme"
import { createElement } from "react"
import { PasswordController as PasswordControllerClientSide } from "./input.client"

export type InputControllerProps = Omit<InputProps, "type"> & {
	type?: "password" | "text"
}
// prettier-ignore
export const InputFormController = <T extends FieldValues, K extends Path<T>> ({ name, control, ...props }: {
  name: K
  control: Control<T>,
} & Pick<HTMLElement, "className"> & Omit<InputControllerProps, "value" | "onValueChange">) => {
  return <FormController control={control} name={name}>
    {
      ({ field: { onChange, ...field }, fieldState }) =>
        createElement(
          props.type === "password" ? PasswordController : InputController,
          {
            ...props,
            errorMessage: fieldState.error?.root?.message || fieldState.error?.message,
            isInvalid: Boolean(fieldState.error),
            ...field,
            onValueChange: onChange,
          }
        )
    }
  </FormController>
}

// prettier-ignore
export const InputController = ({ classNames, ...rest }: InputControllerProps) => {
  return (
    <Input
      variant="flat"
      color="default"
      size="sm"
      defaultValue=""
      classNames={{
        ...classNames,
        inputWrapper: cn("dark:!bg-light/20", classNames?.inputWrapper),
        input: cn("text-xs dark:caret-white", classNames?.input),
      }}
      {...rest}
    />
  )
}

export const PasswordController = PasswordControllerClientSide
