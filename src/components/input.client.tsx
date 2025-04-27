"use client"

import { createElement, useRef, useState } from "react"
import { InputController, InputControllerProps } from "./input"
import { Button } from "@heroui/button"
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline"

// prettier-ignore
export const PasswordController = (props: Omit<InputControllerProps, "type" | "endContent" | "id">) => {
  const [isVisible, setIsVisible] = useState<boolean>(false)
  const ref = useRef<HTMLInputElement | null>(null)

  const handleOnPress = () => {
    setIsVisible((isVisible) => !isVisible)
  }

  return <InputController 
    ref={ref}
    size="sm"
    variant="flat"
    color="default"
    {...props}
    type={isVisible? "text" : "password"}
    endContent={
      <Button
        isIconOnly
        type="button"
        size={props.size}
        className="h-5"
        variant="light"
        radius={props.radius}
        onPress={handleOnPress}
      >
        {
          createElement(
            isVisible ? EyeSlashIcon : EyeIcon,
            { width: 14, height: 14 }
          )
        }
      </Button> 
    }
  />
}
