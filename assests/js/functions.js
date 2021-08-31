export function get_element(string) {
    return document.querySelector(string)
}

export function get_element_all(string) {
    return document.querySelectorAll(string)
}

export function fill_fields() {
    const number_random = Math.random().toFixed(1) * 10
    
    get_element('#name').value = 'Jhon'
    get_element('#email').value = `email.test.${number_random}@gmail.com`
    get_element('#phone').value = `9${number_random}71${number_random}64${number_random}4`
    get_element('#company').value = 'Atlanta'
}