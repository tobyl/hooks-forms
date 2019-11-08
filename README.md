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

**NOTE**: You can see an example of this in the demo provided, in the Address.js fieldset.

The callback is called with the changed value, in case you want to run a comparison based on that value directly.

**Note:** The exact same approach can be applied to adding callbacks to `onFocus` and `onBlur`.

# Downsides to this approach

The previous approach to forms in OSS worked by fields handling their own state. The new approach holds form data and form error data in the root form. The most common bug in this scenario is a field that is shown conditionally not having it's state synced to form state.

For example, a field that toggles an `other` text field to be shown/hidden might lead to a bug where the `other` text field is shown, some data is entered, then the field is toggled off. There is no code in place to handle automatically removing the `other` field value entered, so form data is out of sync with the fields that are currently visible.

This is not considered a show stopping problem, because the new system provides not only far greater simplicity, but also far greater flexibility.

To address this issue, you can handle cleanup wherever you declare your callback:

```
const someFieldChange = value => {
  if (value !== 'other') {
    form.setValue('some_field_other', null)
    form.setError('some_field_other', null)
  }
}

return (
  <>
    <Select
      name+"some_field"
      ChangeCallback={someFieldChange}
      choices={[
        ['first', 'First'],
        ['second', 'Second'],
      ]}
    />
    {form.data['some_field'] === 'other'  && (
      <Text name="some_field_other" />
    )}
  </>
)

```

Finally, it would be trivial to add some boilerplate code to handle this cleanup automatically. However, in most cases I have found more power and flexibility in this pattern, and it also keeps the responsibility for cleanup linked to the logic that shows/hides each field.

# Field cleans

There is one very simple clean in place right now, for required fields. On blur, if a field value is either `''` or `'-1'` then a required error will display.

This can obviously be fleshed out to handle cleans however you'd like. For example:

```
<Text
  name="some_field"
  cleans={[overThreeChars, underTenChars]}
/>
```

Then in `useField.js` you can loop over supplied cleans:

```
cleans.forEach(clean => {
  try {
    clean(val)
  } catch (e) {
    form.setError(name, e.message)
  }
})
```

Then structure each clean to throw an error:

```
export const overThreeChars = value => {
  if (value.length < 3) {
    throw new Error('Must be more than three chars')
  }
}
```
