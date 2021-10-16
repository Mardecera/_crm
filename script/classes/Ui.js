import * as DOM from '../functions/selectors.js'
import * as FUNC from '../functions/functions.js'

const CONFIRMATION_MESSAGE = 'Deasea eliminar este cliente?'

export class UI {
    showMessage(type = '', message = '') {
        const divMessage = FUNC.getHTML({
            type: 'div',
            classes: [type],
            text_content: message,
        })

        DOM.form.appendChild(divMessage)
    }

    showClients(clients) {
        this.changeEmptyList()
        const fragment = document.createDocumentFragment()
        const template = document.querySelector('#template__clients').content
        const $template = (query) => template.querySelector(query)

        clients.forEach(({ company, email, id, name, phone }) => {
            const href = `./pages/edit_client.html?id=${id}`

            $template('.client__names').textContent = name
            $template('.client__email').textContent = email
            $template('.client__phone__number').textContent = phone
            $template('.client__company__name').textContent = company
            $template('.btn-edit').href = href

            const clone = template.cloneNode(true)
            clone.querySelector('.btn-delete').onclick = (event) =>
                this.getConfirmation(event.target.parentNode.parentNode, id)
            fragment.appendChild(clone)
        })

        DOM.tableClients.appendChild(fragment)
    }

    fillForm({ name, email, phone, company, id }) {
        DOM.input_name.value = name
        DOM.input_email.value = email
        DOM.input_phone.value = phone
        DOM.input_company.value = company
    }

    getConfirmation(clientHTML, id) {
        const template = document.querySelector(
            '#template__confirmation'
        ).content
        const clone = template.cloneNode(true)
        const cloneBody = clone.querySelector('.confirmation-body')
        const cloneButtonAccept = clone.querySelector('.btn-accept')
        const cloneButtonCancel = clone.querySelector('.btn-cancel')

        cloneBody.textContent = CONFIRMATION_MESSAGE
        cloneButtonAccept.onclick = (event) => {
            clientHTML.remove()
            event.target.parentNode.parentNode.parentNode.remove()
            this.deleteClient(id)
        }
        cloneButtonCancel.onclick = (event) =>
            event.target.parentNode.parentNode.parentNode.remove()
        DOM.container.appendChild(clone)
    }

    changeEmptyList() {
        DOM.emptyList.classList.toggle('hidden')
        DOM.table.classList.toggle('hidden')
    }
}
