import { get_element } from "./functions.js"

const form = get_element('#add-client')
const input_name = get_element('#name')
const input_email = get_element('#email')
const input_phone = get_element('#phone')
const input_company = get_element('#company')

const table_client_body = get_element('#table-clients tbody')

export {
    form,
    input_name,
    input_email,
    input_phone,
    input_company,
    table_client_body
}