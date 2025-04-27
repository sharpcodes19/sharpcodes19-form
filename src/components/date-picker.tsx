import { DatePicker, DatePickerProps } from "@heroui/date-picker"
import { Control, FieldValues, Path } from "react-hook-form"
import { FormController } from "./controller"
import { DateValue, now } from "@internationalized/date"
import { cn } from "@heroui/theme"

export type DatePickerControllerProps = DatePickerProps

// prettier-ignore
export const DatePickerFormController = <T extends FieldValues, K extends Path<T>> ({ timeZone, name, control, ...props }: {
  name: K
  control: Control<T>
  timeZone: string
} & Partial<Pick<HTMLElement, "className"> & Omit<DatePickerControllerProps, "value" | "onChange">>) => {
  return <FormController control={control} name={name}>
    {
      ({ field: { onChange, ...field }, fieldState }) => {

        return <DatePickerController
          {...props}
          errorMessage={fieldState.error?.root?.message || fieldState.error?.message}
          isInvalid={Boolean(fieldState.error)}
          {...field}
          // @ts-expect-error date must have, date#day, date#month, date#year
          onChange={
            (date: DateValue) => {
              onChange(now(timeZone).set({ day: date?.day, month: date?.month, year: date?.year }))
            }
          }
        />
      }
      // value={issuedAtController.field.value}
      // onChange={
      //   (date: DateValue) => {
      //     issuedAtController.field.onChange(now(tz).set(date))
      //   }
      // }
    }
  </FormController>
}

// prettier-ignore
export const DatePickerController = ({ classNames, calendarProps, ...props }: DatePickerControllerProps) => {
  return (
    <DatePicker
      granularity="day"
      size="sm"
      classNames={{
        ...classNames,
        segment: cn("text-xs", classNames?.segment),
      }}
      calendarProps={{
        ...calendarProps,
        classNames: {
          ...calendarProps?.classNames,
          cell: cn("text-xs", calendarProps?.classNames?.cell),
          title: cn("text-xs", calendarProps?.classNames?.title),
        }
      }}
      {...props}
    />
  )
}
