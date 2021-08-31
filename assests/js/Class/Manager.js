import { UI } from "./Ui.js"

const MESSAGE_ERROR = 'Todos los campos son necesarios.'
const MESSAGE_SUCCESS = 'Cliente creado correctamente'
const MESSAGE_SUCCESS_EDIT = 'Cliente editado correctamente'

export class Manager{
    constructor() {
        this.ui = new UI()
    }

    add(event, edit) {
        event.preventDefault()

        const is_edit = !!edit.id
        const request = window.indexedDB.open('CRM', 1)

        request.onsuccess = () => {
            const DB = request.result
            const transaction = DB.transaction('client', 'readwrite')
            const object_store = transaction.objectStore('client')
            const data = this.ui.get_data()
            
            for (let feature of data) {
                if (!!!data[feature[0]]) {
                    this.ui.show_message('error', MESSAGE_ERROR)
                    return
                }
            }
            if (is_edit) {
                data.id = edit.id
                object_store.put(data)
                this.ui.show_message('success', MESSAGE_SUCCESS_EDIT)
            } else {
                object_store.add(data)
                this.ui.show_message('success', MESSAGE_SUCCESS)
            }
            setTimeout(() => {
                window.location = '/index.html'
            }, 1500)
        }
    }

    load_data() {
        const request = window.indexedDB.open('CRM', 1)

        request.onsuccess = () => {
            const DB = request.result
            const transaction = DB.transaction('client', 'readonly')
            const object_store = transaction.objectStore('client')

            object_store.getAll().onsuccess = (event) => {
                const all_data = event.target.result
                this.ui.show_data_clients(all_data)
            }

        }
    }

    delete(id) {
        const request = window.indexedDB.open('CRM', 1)

        request.onsuccess = () => {
            const DB = request.result
            const transaction = DB.transaction('client', 'readwrite')
            const object_store = transaction.objectStore('client')

            object_store.delete(id)
            this.ui.delete_client(id)
        }
    }

    set_data_client_form(id) {
        const request = window.indexedDB.open('CRM', 1)

        request.onsuccess = () => {
            const DB = request.result
            const transaction = DB.transaction('client', 'readonly')
            const object_store = transaction.objectStore('client')

            object_store.get(id).onsuccess = (event) => {
                const data_client = event.target.result
                this.ui.load_data_client_form(data_client)
            }
        }
    }
}