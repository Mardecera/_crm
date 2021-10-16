const $ = (element) => document.querySelector(element)

const form = $('#add-client')
const input_name = $('#name')
const input_email = $('#email')
const input_phone = $('#phone')
const input_company = $('#company')
const table = $('#table-clients')
const tableClients = $('#table-clients tbody')
const emptyList = $('.list-void')
const container = $('.container')

export {
    form,
    input_name,
    input_email,
    input_phone,
    input_company,
    table,
    tableClients,
    emptyList,
    container,
}
