# 🔥 sharpcodes19-form

A lightweight, reusable React + TypeScript form component library built with [Bun](https://bun.sh). Publish-ready for public use via npm.

---

## ✨ Features

- ⚛️ Built with React and TypeScript
- 💅 Styled with [HeroUI](https://www.heroui.com/)
- 🎯 Tree-shakable and typed
- ⚡ Fast builds with Bun
- 📦 Easy to use in any React app

---

## 📦 Installation

- 📦 Make sure to install [HeroUI](https://www.heroui.com/docs/guide/installation) first.

```bash
npm install sharpcodes19-form
```

or

```bash
yarn add sharpcodes19-form
```

or

```bash
bun add sharpcodes19-form
```

---

## 🚀 Basic Usage

```bash
import { Form } from "react-hook-form"
import { InputControllerProps } from "sharpcodes19-form"
import { z } from "zod"

const formValues = z.object({
  username: z.string().min(1, "Required")
})

type FormValues = z.output<typeof formValues>

export const SampleComponent = () => {
  const form = useForm({
    resolver: zodResolver(formValues),
    defaultValues: {
      username: ""
    }
  })

  return <Form {...form}>
    <InputControllerProps control={form.control} name="username" label="Username" size="sm" variant="flat" />
  </Form>

}
```
