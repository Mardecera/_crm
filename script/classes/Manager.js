import { UI } from './Ui.js'

const INDEXEDDB_MESSAGE_ALERT =
    'Your browser does not have IndexedDB for this application to work, update your browser.'
const MESSAGE_SUCCESS = 'Cliente creado correctamente'
const MESSAGE_SUCCESS_EDIT = 'Cliente editado correctamente'

export class Manager extends UI {
    constructor() {
        super()
        this.init_DB()
        this.totalClients = 0
    }

    init_DB() {
        if (window.indexedDB) {
            const request = window.indexedDB.open('CRM', 1)

            request.onupgradeneeded = function (evt) {
                const db = evt.target.result
                const object_store = db.createObjectStore('client', {
                    keyPath: 'id',
                    autoIncrement: true,
                })

                object_store.createIndex('name', 'name', { unique: false })
                object_store.createIndex('email', 'email', { unique: true })
                object_store.createIndex('phone', 'phone', { unique: true })
                object_store.createIndex('company', 'company', {
                    unique: false,
                })
                object_store.createIndex('id', 'id', { unique: true })
            }
        } else {
            alert(INDEXEDDB_MESSAGE_ALERT)
        }
    }

    addClient(client, id = '') {
        const request = window.indexedDB.open('CRM', 1)

        request.onsuccess = () => {
            const DB = request.result
            const transaction = DB.transaction('client', 'readwrite')
            const objectStore = transaction.objectStore('client')

            if (!!id) {
                client.id = id
                objectStore.put(client)
                this.showMessage('success', MESSAGE_SUCCESS_EDIT)
            } else {
                objectStore.add(client)
                this.totalClients++
                this.showMessage('success', MESSAGE_SUCCESS)
            }
            setTimeout(() => (window.location = '../index.html'), 1500)
        }
    }

    getClients() {
        const request = window.indexedDB.open('CRM', 1)

        request.onsuccess = () => {
            const DB = request.result
            const transaction = DB.transaction('client', 'readonly')
            const objectStore = transaction.objectStore('client')

            objectStore.getAll().onsuccess = (event) => {
                const clients = event.target.result
                if (!!clients.length) {
                    this.totalClients = clients.length
                    this.showClients(clients)
                }
            }
        }
    }

    getClient(id) {
        const request = window.indexedDB.open('CRM', 1)

        request.onsuccess = () => {
            const DB = request.result
            const transaction = DB.transaction('client', 'readonly')
            const objectStore = transaction.objectStore('client')

            objectStore.get(id).onsuccess = (event) => {
                const client = event.target.result
                this.fillForm(client)
            }
        }
    }

    deleteClient(id) {
        const request = window.indexedDB.open('CRM', 1)

        request.onsuccess = () => {
            const DB = request.result
            const transaction = DB.transaction('client', 'readwrite')
            const objectStore = transaction.objectStore('client')

            objectStore.delete(id)
            --this.totalClients
            if (this.totalClients === 0) {
                this.changeEmptyList()
            }
        }
    }
}
