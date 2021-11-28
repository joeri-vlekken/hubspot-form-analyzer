const updateForms = () => {

    const fields = document.querySelectorAll('.hs-form-field');

    fields.forEach(field => {
        const inputField = field.querySelector('.input').querySelector('.hs-input')
        if (inputField && inputField.type === 'hidden') {
            field.classList.add("hs-form-debug-highlight");
            inputField.type = 'text';
        }

        field.classList.add("hs-form-debug-show")
    })
}

const targetNode = document.querySelector('body');

const config = {
    attributes: true,
    childList: true,
    characterData: true
};

const callback = mutations => {
    mutations.forEach(mutation => {
        if (mutation.type === 'childList') {
            const listValues = Array.from(targetNode.children)
                .map(node => node.innerHTML);
            if (listValues.flat().some(function (v) {
                return v.indexOf("hbspt") >= 0
            })) {
                updateForms();
            }
        }
    });
}

const observer = new MutationObserver(callback);

try {
    observer.observe(targetNode, config);
} catch (error) {

}
