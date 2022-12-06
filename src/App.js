import "./styles.css";
import {
  useForm,
  Controller,
  FormProvider,
  useFormContext
} from "react-hook-form";

import { jsonSchemaToZod, parseSchema } from "json-schema-to-zod";

const myObject = {
  type: "object",
  properties: {
    hello: {
      type: "string"
    }
  }
};

const result = jsonSchemaToZod(myObject);
// console.log(result);

const zodSchema = parseSchema(myObject, false);
// console.log(zodSchema);

/**
 * Inline errors
 * Rules / nested sets
 * Server errors / raising extra errors
 */

const LANG_FILE = {
  firstName: {
    label: "First name",
    placeholder: "Enter your name"
  },
  email: {
    label: "Email",
    placeholder: "Enter your email"
  }
};

const dataSchema = {
  firstName: {
    type: "text",
    minLength: 1,
    required: true
  },
  lastName: {
    type: "text",
    minLength: 1
    // requiredOr...
  },
  email: {
    type: "email",
    minLength: 1
  },
  title: {
    type: "select",
    options: [{ key: "mr", label: "Mr" }]
  }
  // checkbox single
  // checkbox multi
  // radios
};

function foo(fooDataSchema) {}

const validationSchema = foo(dataSchema);

// Pass dataSchema into zod

// How to modify the dataSchema - customiseSchema
/**
 * const myAlterations = [
 *    {
 *      name: firstName,
 *      component: 'KeyValue'
 *    }
 * ]
 *
 *
 * const foo = customiseSchema(dataSchema, () => {
 * })
 *
 *
 */

function Block({ children }) {
  return (
    <div
      style={{
        display: "flex",
        marginBottom: "0.5em",
        alignItems: "center",
        columnGap: "0.5em"
      }}
    >
      {children}
    </div>
  );
}

function InputField({ label, name, id, placeholder, type = "text" }) {
  const { control, errors } = useFormContext();

  console.log(errors);

  return (
    <Block>
      <label htmlFor={id}>{label}</label>
      <Controller
        name={name}
        control={control}
        value=""
        render={({ field }) => {
          return (
            <input id={id} {...field} placeholder={placeholder} type={type} />
          );
        }}
      />
    </Block>
  );
}

function SelectField({ label, name, id, placeholder, type = "text" }) {
  const { control } = useFormContext();

  return (
    <Block>
      <label htmlFor={id}>{label}</label>
      <Controller
        name={name}
        control={control}
        value=""
        render={({ field }) => (
          <input id={id} {...field} placeholder={placeholder} type={type} />
        )}
      />
    </Block>
  );
}

function Fields({ dataSchema, langFile }) {
  return Object.entries(dataSchema).map(([key, field]) => {
    if (field.type === "text" || field.type === "email")
      return (
        <InputField
          key={key}
          type={field.type}
          name={key}
          label={LANG_FILE[key]?.label || key}
          placeholder={LANG_FILE[key]?.placeholder}
          minLength={field.minLength}
          maxLength={field.maxLength}
          id={key}
        />
      );
    return null;
  });
}

export default function App() {
  const methods = useForm({
    defaultValues: {
      firstName: "",
      lastName: ""
    }
  });

  const onSubmit = (data) => console.log("here", data);

  return (
    <div className="App">
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <Fields dataSchema={dataSchema} langFile={LANG_FILE} />
          <Block>
            <button type="submit">Submit</button>
          </Block>
        </form>
      </FormProvider>
    </div>
  );
}
