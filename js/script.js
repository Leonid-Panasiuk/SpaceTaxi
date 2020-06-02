// $(window).on("scroll", function() {
//     var s = Math.min(400, $(document).scrollTop()) + 100;
//     $("img").width(s).height(s);
// });

let craters = ["Aristoteles", "Aratus", "Abbot",  "Bancroft", "Barnard", "Banachiewicz"];

function autocomplete(input, list) {
    let currentFocus;

    input.addEventListener("input", function () {
        let inputValue = this.value;

        closeAllLists();
        if (!inputValue) {
            return false;
        }
        currentFocus = -1;

        let autocompleteList = document.createElement("DIV");
        autocompleteList.setAttribute("id", this.id + "autocomplete-list");
        autocompleteList.setAttribute("class", "autocomplete-items");

        this.parentNode.appendChild(autocompleteList);

        for (let i = 0; i < list.length; i++) {
            if (list[i].substring(0, inputValue.length).toLowerCase() === inputValue.toLowerCase()) {
                let autocompleteItem = document.createElement("DIV");
                autocompleteItem.innerHTML = "<strong>" + list[i].substr(0, inputValue.length) + "</strong>";
                autocompleteItem.innerHTML += list[i].substr(inputValue.length);
                autocompleteItem.innerHTML += "<input type='hidden' value='" + list[i] + "'>";
                autocompleteItem.addEventListener("click", function (e) {
                    input.value = this.getElementsByTagName("input")[0].value;
                });

                autocompleteList.appendChild(autocompleteItem);
            }
        }
    });

    input.addEventListener("keydown", function (e) {
        let autocompleteList = document.getElementById(this.id + "autocomplete-list");
        if (autocompleteList) {
            autocompleteList = autocompleteList.getElementsByTagName("div");
        }

        if (e.keyCode == 40) {
            currentFocus++;
            addActive(autocompleteList);
        } else if (e.keyCode === 38) {
            currentFocus--;
            addActive(autocompleteList);
        } else if (e.keyCode === 13) {
            e.preventDefault();
            if (currentFocus > -1) {
                if (autocompleteList) {
                    autocompleteList[currentFocus].click();
                }
            }
        }
    });

    function addActive(autocompleteList) {
        if (!autocompleteList) {
            return false;
        }
        removeActive(autocompleteList);
        if (currentFocus >= autocompleteList.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = (autocompleteList.length - 1);
        autocompleteList[currentFocus].classList.add("autocomplete-active");
    }

    function removeActive(autocompleteList) {
        for (let i = 0; i < autocompleteList.length; i++) {
            autocompleteList[i].classList.remove("autocomplete-active");
        }
    }

    function closeAllLists() {
        let autocompleteList = document.getElementsByClassName("autocomplete-items");
        for (let i = 0; i < autocompleteList.length; i++) {
            autocompleteList[i].parentNode.removeChild(autocompleteList[i]);
        }
    }

    document.addEventListener("click", function () {
        closeAllLists();
    });
}

let fromElement = document.getElementById("from");
let toElement = document.getElementById("to");

autocomplete(fromElement, craters);
autocomplete(toElement, craters);

// Swap

let swapElement = document.getElementById("swap");
swapElement.addEventListener("click", function () {
    let temp = fromElement.value;

    fromElement.value = toElement.value;
    toElement.value = temp;
});

// Validation

function validateForm(form) {
    let elements = form.elements;

    for (let i = 0; i < elements.length; i++) {
        if (elements[i].type === "text" && !elements[i].value)
            return false;
    }

    return true;
}

document.getElementById("submit-btn").addEventListener('click', function () {
    let formControl = document.getElementById("form-control");
    let errorMessageElement = document.getElementById("error-message");
    if (validateForm(formControl)) {
        errorMessageElement.style.display = "none";
        formControl.submit();
        alert('Success');
    } else {
        errorMessageElement.style.display = "block";
    }
});

// Comment

$(document).ready(function () {
    $(".open-comment").click(function () {
        $(".comment").toggle(700);
    });
});

