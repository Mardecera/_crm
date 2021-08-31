import {
    input_name, input_email, input_phone, input_company, form, table_client_body
} from '../selectors.js'
import { create_element } from '../create_elements.js'
import { get_element_all } from '../functions.js'

export class UI {
    get_data() {
        return {
            name: input_name.value,
            email: input_email.value,
            phone: input_phone.value,
            company: input_company.value,
            id: Date.now(),
            [Symbol.iterator]: function* () {
                for (let key in this){ yield [key, this[key]]}
            }
        }
    }

    clean_fields() { form.reset() }

    show_message(type = '', message = '') {
        const msn_child = create_element({
            type: 'div',
            classes: [`${type}-msn`],
            text_content: message
        })
        const msn_parent = create_element({ type: 'div', classes: ['msn'] })
        
        msn_parent.appendChild(msn_child)
        form.appendChild(msn_parent)
        setTimeout(() => {
            msn_parent.remove()
        }, 1500)
    }

    show_data_clients(all_data = []) {
        all_data.forEach(client => {
            const href = `assests/pages/edit_client.html?id=${client.id}`
            const row = create_element({ type: 'tr' })
            const td_name = create_element({type: 'td', text_content: client.name})
            const td_email = create_element({type: 'td', text_content: client.email})
            const td_phone = create_element({type: 'td', text_content: client.phone})
            const td_company = create_element({type: 'td', text_content: client.company})
            const td_actions = create_element({ type: 'td', classes: ['td-btn']})
            const btn_edit = create_element({type: 'a', classes: ['btn', 'btn-edit'], href: href})
            const btn_delete = create_element({ type: 'a', classes: ['btn', 'btn-delete'], attributes: [['data-id', client.id]]})
            const icon_edit = create_element({type: 'i', classes: ['fas', 'fa-pen']})
            const icon_delete = create_element({ type: 'i', classes: ['fas', 'fa-trash-alt'] })

            btn_delete.appendChild(icon_delete)
            btn_edit.appendChild(icon_edit)
            td_actions.appendChild(btn_edit)
            td_actions.appendChild(btn_delete)
            row.appendChild(td_name)
            row.appendChild(td_email)
            row.appendChild(td_phone)
            row.appendChild(td_company)
            row.appendChild(td_actions)

            table_client_body.appendChild(row)
        })
    }

    delete_client(id) {
        const elements = get_element_all('.btn-delete')
        elements.forEach(element => {
            const element_id = +element.getAttribute('data-id')
            if (id === element_id) {
                const current = element.parentElement.parentElement
                current.remove()
                return
            }
        })
    }

    load_data_client_form(data_client) {
        input_name.value = data_client.name
        input_email.value = data_client.email
        input_phone.value = data_client.phone
        input_company.value = data_client.company
    }
}