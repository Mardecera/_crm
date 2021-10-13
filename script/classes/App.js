import { Manager } from './Manager.js'
import * as DOM from '../functions/selectors.js'

export class App {
    constructor() {
        this.MANAGER = new Manager()
        this.router = window.location.pathname.split('/').pop()
        this.init()
    }

    init() {
        window.onload = () => {
            if (this.router === 'index.html') {
                this.MANAGER.getClients()
            }
            if (this.router === 'add_client.html') {
                DOM.form.addEventListener('submit', (event) => {
                    event.preventDefault()
                    this.MANAGER.addClient(this.getClientData())
                })
            }
            if (this.router === 'edit_client.html') {
                const params = new URLSearchParams(window.location.search)
                const id = +params.get('id')
                this.MANAGER.getClient(id)

                DOM.form.addEventListener('submit', (event) => {
                    event.preventDefault()
                    this.MANAGER.addClient(this.getClientData(), id)
                })
            }
        }
    }

    getClientData() {
        return {
            name: DOM.input_name.value,
            email: DOM.input_email.value,
            phone: DOM.input_phone.value,
            company: DOM.input_company.value,
            id: Date.now(),
        }
    }
}
