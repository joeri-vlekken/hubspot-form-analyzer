const showForms_checkBox = document.getElementById("showForms")
const showEdit_checkBox = document.getElementById("showEdit")

// Check if showForms data is present in the storage API.
chrome.storage.sync.get(['hsfa_showForms'], function(result) {
    // Set the checkbox to correspondent to the showForms settings.
    if (result.hsfa_showForms) {
        showForms_checkBox.checked = false;
    } else {
        showForms_checkBox.checked = true;
    }
});

// Update the showEdit setting when clicked.
showForms_checkBox.addEventListener('change', function() {
    if (this.checked) {
        chrome.storage.sync.set({hsfa_showForms: false}, function() {
            console.log('Hidden fields enabled.');
        });
    } else {
        chrome.storage.sync.set({hsfa_showForms: true}, function() {
            console.log('Hidden fields disabled.');
        });
    }
});


// Check if showForms data is present in the storage API.
chrome.storage.sync.get(['hsfa_showEdit'], function(result) {
    // Set the checkbox to correspondent to the showForms settings.
    if (result.hsfa_showEdit) {
        showEdit_checkBox.checked = false;
    } else {
        showEdit_checkBox.checked = true;
    }
});

// Update the showEdit setting when clicked.
showEdit_checkBox.addEventListener('change', function() {
    if (this.checked) {
        chrome.storage.sync.set({hsfa_showEdit: false}, function() {
            console.log('Edit links enabled.');
        });
    } else {
        chrome.storage.sync.set({hsfa_showEdit: true}, function() {
            console.log('Edit links disabled.');
        });
    }
});