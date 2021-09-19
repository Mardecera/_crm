import * as DOM from '../functions/selectors.js'
import * as FUNC from '../functions/functions.js'

const  CONFIRMATION_MESSAGE = 'Deasea eliminar este cliente?'

export class UI {
    showMessage(type = '', message = '') {
        const divMessage = FUNC.getHTML({
            type: 'div',
            classes: [type],
            text_content: message
        })
        
        DOM.form.appendChild( divMessage )
    }

    showClients(clients) {
        this.changeEmptyList()

        clients.forEach(client => {
            const href = `public/pages/edit_client.html?id=${client.id}`
            const clientHTML        = FUNC.getHTML({type: 'tr'})
            const clientHTMLName    = FUNC.getHTML({type: 'td', text_content: client.name})
            const clientHTMLEmail   = FUNC.getHTML({type: 'td', text_content: client.email})
            const clientHTMLPhone   = FUNC.getHTML({type: 'td', text_content: client.phone})
            const clientHTMLCompany = FUNC.getHTML({type: 'td', text_content: client.company})
            const clientHTMLActions = FUNC.getHTML({type: 'td', classes: ['td-btn']})
            const clientHTMLEdit    = this.getRowButtonEdit( href )
            const clientHTMLDelete  = this.getRowButtonDelete( clientHTML, client.id )
            
            clientHTML.appendChild(clientHTMLName)
            clientHTML.appendChild(clientHTMLEmail)
            clientHTML.appendChild(clientHTMLPhone)
            clientHTML.appendChild(clientHTMLCompany)
            clientHTML.appendChild(clientHTMLActions)
            clientHTMLActions.appendChild(clientHTMLEdit)
            clientHTMLActions.appendChild(clientHTMLDelete)

            DOM.tableClients.appendChild(clientHTML)
        })
    }

    fillForm({ name, email, phone, company, id}) {
        DOM.input_name.value = name
        DOM.input_email.value = email
        DOM.input_phone.value = phone
        DOM.input_company.value = company
    }

    getRowButtonDelete( clientHTML, id ) {
        const buttonDelete = FUNC.getHTML({ classes: ['btn', 'btn-delete'] })
        const icon = FUNC.getHTML({ type: 'i', classes: ['fas', 'fa-trash-alt'] })

        buttonDelete.appendChild(icon)
        buttonDelete.onclick = () => this.getConfirmation(clientHTML, id)
        return buttonDelete
    }

    getRowButtonEdit( href ) {
        const buttonEdit = FUNC.getHTML({
            type: 'a',
            classes: ['btn', 'btn-edit'],
            href: href
        })
        const icon = FUNC.getHTML({ type: 'i', classes: ['fas', 'fa-pen'] })
        
        buttonEdit.appendChild(icon)
        return buttonEdit
    }

    getConfirmation( clientHTML, id ) {
        const confirmationBG = FUNC.getHTML({ classes: ['confirmation-bg'] })
        const confirmationCard = FUNC.getHTML({ classes: ['confirmation'] })
        const confirmationBody = FUNC.getHTML({
            classes: ['confirmation-body'], text_content: CONFIRMATION_MESSAGE
        })
        const confirmationButtons = this.getConfirmationButtons(clientHTML, confirmationBG, id)
        
        confirmationBG.appendChild( confirmationCard )
        confirmationCard.appendChild( confirmationBody )
        confirmationCard.appendChild( confirmationButtons )
        
        DOM.container.appendChild(confirmationBG)
    }

    getConfirmationButtons( clientHTML, confirmationBG, id ) {
        const divButtons = FUNC.getHTML({
            classes: ['confirmation-buttons']
        })
        const acceptButton = FUNC.getHTML({
            type: 'button', classes: ['btn-accept'], text_content: 'Accept'
        })
        const cancelButton = FUNC.getHTML({
            type: 'button', classes: ['btn-cancel'], text_content: 'Cancel'
        })
        
        acceptButton.onclick = _ => {
            clientHTML.remove()
            confirmationBG.remove()
            this.deleteClient( id )
        }
        cancelButton.onclick = _ => confirmationBG.remove()
        divButtons.appendChild(acceptButton)
        divButtons.appendChild(cancelButton)

        return divButtons
    }

    changeEmptyList() {
        DOM.emptyList.classList.toggle('hidden')
        DOM.table.classList.toggle('hidden')
    }
}