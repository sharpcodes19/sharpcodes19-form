import { Control, FieldValues, Path } from "react-hook-form"
import {
  Autocomplete,
  AutocompleteItem,
  AutocompleteProps,
} from "@heroui/autocomplete"
import { cn } from "@heroui/theme"
import { CheckIcon } from "@heroicons/react/24/outline"
import { FormController } from "./controller"

export type AutocompleteLookupItemProps = {
  label: string
  value: string | number
}

type AutocompleteControllerProps = Omit<
  AutocompleteProps<AutocompleteLookupItemProps>,
  "items" | "children" | "classNames"
> & {
  classNames?: AutocompleteProps<AutocompleteLookupItemProps>["classNames"] & {
    icon?: HTMLElement["className"]
  }
}

// prettier-ignore
export const AutocompleteController = ({ classNames, ...props }: AutocompleteControllerProps) => {

  return <Autocomplete
    isClearable
    labelPlacement="outside"
    size="sm"
    variant="flat"
    color="default"
    classNames={{
      ...classNames,
      base: cn("[&_input]:text-xs text-xs", classNames?.base)
    }}
    {...props}
  >
    {
      ({ label, value }) =>
        <AutocompleteItem
          key={value}
          classNames={{
            title: "text-xs"
          }}
          selectedIcon={
            ({ isDisabled, isSelected }) =>
              <CheckIcon
                className={
                  cn(
                    "text-xs",
                    isDisabled ? "text-gray-300" : undefined,
                    isSelected ? "text-default-500" : "hidden",
                    classNames?.icon
                  )
                }
              />
          }
        >{label}</AutocompleteItem>
    }
  </Autocomplete>
}

// prettier-ignore
export const AutocompleteFormController = <T extends FieldValues, K extends Path<T>> ({ name, control, ...props }: {
  name: K
  control: Control<T>,
} & Partial<Pick<HTMLElement, "className"> & Omit<AutocompleteControllerProps, "value" | "onValueChange">>) => {
  return <FormController control={control} name={name}>
    {
      ({ field: { onChange, ...field }, fieldState }) =>
        <AutocompleteController
          {...props}
          errorMessage={fieldState.error?.root?.message || fieldState.error?.message}
          isInvalid={Boolean(fieldState.error)}
          {...field}
          onSelectionChange={onChange}
        />
    }
  </FormController>
}
