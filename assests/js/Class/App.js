import { Manager } from './Manager.js'
import { fill_fields } from '../functions.js'
import { form } from '../selectors.js'

const INDEXEDDB_MESSAGE_ALERT = 'Su navegador no cuenta con IndexedDB para que funcione esta aplicacion, actualice su navegador.'

export class App{
    constructor() {
        this.init()
        this.manager = new Manager()
        this.router = window.location.pathname.split('/').pop()
    }

    init() { this.load_events() }

    init_DB() {
        if (window.indexedDB) {
            const DB = window.indexedDB.open('CRM', 1)

            DB.onupgradeneeded = function (evt) {
                const db = evt.target.result
                const object_store = db.createObjectStore('client', {
                    keyPath: 'id',
                    autoIncrement: true
                })

                object_store.createIndex('name', 'name', { unique: false })
                object_store.createIndex('email', 'email', { unique: true })
                object_store.createIndex('phone', 'phone', { unique: true })
                object_store.createIndex('company', 'company', { unique: false })
                object_store.createIndex('id', 'id', { unique: true })
            }

        } else { alert(INDEXEDDB_MESSAGE_ALERT) }
    }

    load_events() {
        window.onload = () => {
            this.init_DB()

            if (this.router === 'index.html') {
                this.manager.load_data()
                this.delete_client_events()
            }if (this.router === 'add_client.html') {
                this.add_client_events('')
            } if (this.router === 'edit_client.html') {
                const params = new URLSearchParams(window.location.search)
                const id = params.get('id')

                this.manager.set_data_client_form(+id)
                this.add_client_events(+id)
            }
        }
    }

    add_client_events(id) {
        form.addEventListener('submit', (event) => {
            this.manager.add(event, { id: id})
        })
    }

    delete_client_events() {
        const table = document.querySelector('#table-clients')

        table.addEventListener('click', (event) => {
            const id = event.target.getAttribute('data-id')
            if (!!id) { this.manager.delete(+id) }
        })
    }
}