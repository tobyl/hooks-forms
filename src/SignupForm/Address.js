import React from 'react'
import Text from '../forms/fields/Text'
import Select from '../forms/fields/Select'

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

const Address = () => {
  return (
    <fieldset>
      <Text name="street_number" placeholder="Street Number" />
      <Text name="street_name" placeholder="Street Name" />
      <Text name="city" placeholder="City" />
      <Select name="province" choices={provinces} />
      <Text name="postal_code" placeholder="Postal Code" />
    </fieldset>
  )
}

export default Address