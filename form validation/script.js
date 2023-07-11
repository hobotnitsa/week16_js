const form = document.forms.form;

function checkValidity(input) {
    let validity = input.validity;
    const errorSpan = document.getElementById(`${input.name}-error`);

    if (input.type === 'radio') {
        const inputs = form.querySelectorAll('input[name=gender]');

        if (form[input.name].value === '') {
            inputs.forEach((input) => input.classList.add('error'));
            errorSpan.textContent = input.validationMessage;
        } else {
            inputs.forEach((input) => input.classList.remove('error'));
            errorSpan.textContent = '';
        }
        return;
    }

    if (!validity.valid) {
        //valid заменяет перечисление всех ValueMissing, Mismatch итд, булевое значение
        input.classList.add('error');
        //!! преобразование к булю, пустой ли еррорспан
        if (!!errorSpan) {
            errorSpan.textContent = input.validationMessage;
        }
    } else {
        input.classList.remove('error');
        if (!!errorSpan) {
            errorSpan.textContent = '';
        }
    }
}

function clearErrors(form) {
    Array.from(form.elements).forEach((element) => {
        element.classList.remove('error');
        const errorSpan = document.getElementById(`${element.name}-error`);
        if (!!errorSpan) {
            errorSpan.textContent = '';
        }
    });
}

Array.from(form.elements).forEach((element) => {
    element.addEventListener('change', () => checkValidity(element));
});

form.addEventListener('submit', function (event) {
    event.preventDefault();

    const elems = Array.from(form.elements);
    for (const elem of elems) {
        checkValidity(elem);
    }

    let valid = true;
    for (const elem of elems) {
        if (!elem.checkValidity()) {
            valid = false;
        }
    }

    // the same:
    // const valid = elems.map(e => e.checkValidity()).reduce((prev, curr) => prev && curr)

    if (valid) {
        for (const elem of elems) {
            console.log(elem.value);
        }
        form.reset();
    } else {
        console.warn('form is not valid');
    }
});
