# Hooks Forms

Built using create-react-app.

1. Install: `yarn install`
2. Run: `yarn start`

Or equivalent NPM commands.

# Basic structure

There are three levels to the multi-page forms:

1. The root Form.js, which holds the data and handles basic data setting, updating and removing. This is structured this way so that each Form, Fieldset and Field is able to access data.

2. Fieldsets, created in each form. There is no root element, they exist only to define the individual pages/fieldsets of each form.

3. The fields, which use a custom hook (forms/fields/utils/useField.js) to handle pulling data from the form, and a separate file for each field type (Text.js, Select.js, etc). It is possible to handle all field types in a single file, but I have found that having separate files makes it easier and clearer to manage styling and field-specific functionality.

# Common use cases

The critical functionality for the forms is React Context (useContext Hook). The context is created in Form.js, meaning that at any point below this in form, fieldset or field you can call context and access the data and setters directly:

```
const form = useContext(FormContext)

console.log(form.data)

form.setValue('field_name', 'Some value!')

console.log(form.data['field_name'])
```

In a fieldset, you might want to compare two values and take action. For example:

```
const form = useContext(FormContext)

const CompareVals = value => {
  const firstVal = form.data['first_field']
  const secondVal = form.data['second_field']
  if (firstVal === secondVal) {
    form.setValue('third_field', 'Some Value')
  }
}
```

Every field will accept a `ChangeCallback` prop - this is how you ensure that the function above is called when a specific field changes:

```
return (
  <Text
    name="first_field"
    ChangeCallback={CompareVals}
  />
  <Text
    name="second_field"
    ChangeCallback={CompareVals}
  />
)
```

Teh callback is called with the changed value, in case you want to run a comparison based on that value directly.
