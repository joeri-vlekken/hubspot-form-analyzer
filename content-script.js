const updateForms = () => {

    // Check if showForms data is present in the storage API.
    chrome.storage.sync.get(['hsfa_showForms'], function (result) {
        // If showForms is not present or value is false: updateForms can proceed.
        if (!result.hsfa_showForms) {
            // Get all HubSpot forms
            const forms = document.querySelectorAll('form.hs-form');
            const fieldStart = `<fieldset class="form-columns-1 hs-form-debug-header"><div class="field hs-form-debug-highlight hs-form-debug-show">`
            const fieldEnd = `</div></fieldset>`


            forms.forEach(form => {
                console.log(form.querySelectorAll(".hs-form-debug-header"));
                if (form.querySelectorAll(".hs-form-debug-header").length === 0) {
                    let header;
                    chrome.storage.sync.get(['hsfa_showEdit'], function (result) {
                        console.log(result.hsfa_showEdit)
                        if (!result.hsfa_showEdit) {
                            header = `${fieldStart}HubSpot form: <a href="https://app.hubspot.com/forms/${form.dataset.portalId}/${form.dataset.formId}/" target="_blank">Edit</a> Account: <a href="https://app.hubspot.com/home?portalId=${form.dataset.portalId}" target="_blank">${form.dataset.portalId}</a>${fieldEnd}`;
                        } else {
                            header = `${fieldStart}HubSpot form ${form.dataset.formId} on account ${form.dataset.portalId}${fieldEnd}`;
                        }
                        form.insertAdjacentHTML(
                            'afterbegin',
                            header
                        )
                    });
                }


                // Get all HubSpot fields from the form
                const fields = form.querySelectorAll('.hs-form-field');

                // Iterate through each HubSpot form field
                fields.forEach(field => {
                    const inputField = field.querySelector('.input').querySelector('.hs-input')
                    // If hidden: add the debug class and change the hidden input to text.
                    if (inputField && inputField.type === 'hidden') {
                        field.classList.add("hs-form-debug-highlight");
                        inputField.type = 'text';
                    }
                    // Add the debug-show class to visualise the form row and field.
                    field.classList.add("hs-form-debug-show")
                })


            })


        }
    });
}

// Call the updateForms() function whenever we detect a new HubSpot form.
// We check for a mutation in the DOM and the presence of a HubSpot element.
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

// Add the observer to enable tracking of mutations.
const observer = new MutationObserver(callback);

try {
    observer.observe(targetNode, config);
} catch (error) {

}
