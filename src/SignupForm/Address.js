import React, { useContext } from 'react'
import Text from '../forms/fields/Text'
import Select from '../forms/fields/Select'
import { FormContext } from '../forms/Form'

const provinces = [
  ['AB', 'Alberta'],
  ['BC', 'British Columbia'],
  ['MB', 'Manitoba'],
  ['NB', 'New Brunswick'],
  ['NL', 'Newfoundland and Labrador'],
  ['NT', 'Northwest Territories'],
  ['NS', 'Nova Scotia'],
  ['NU', 'Nunavut'],
  ['ON', 'Ontario'],
  ['PE', 'Prince Edward Island'],
  ['QC', 'Quebec'],
  ['SK', 'Saskatchewan'],
  ['YT', 'Yukon'],
]

const states = [
  ['AL', 'Alabama'],
  ['AK', 'Alaska'],
  ['AZ', 'Arizona'],
  ['AR', 'Arkansas'],
  ['CA', 'California'],
  ['CO', 'Colorado'],
]

const Address = () => {
  const form = useContext(FormContext)

  const countryChange = val => {
    console.log(`Country is now: ${val}`)
    // we could do an if/else check here, but let's just
    // assume that when the country changes we're happy
    // to lose whatever state or province is stored
    form.setValue('province', null)
    form.setValue('state', null)
  }

  return (
    <fieldset>
      <Text name="street_number" placeholder="Street Number" />
      <Text name="street_name" placeholder="Street Name" />
      <Text name="city" placeholder="City" />
      <Select
        name="country"
        choices={[['canada', 'Canada'], ['us', 'U.S.']]}
        ChangeCallback={countryChange}
      />
      {form.data['country'] === 'us' && (
        <Select name="state" choices={states} />
      )}
      {form.data['country'] === 'canada' && (
        <Select name="province" choices={provinces} />
      )}
      <Text name="postal_code" placeholder="Postal Code" />
    </fieldset>
  )
}

export default Address