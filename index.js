
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://playground-e3a0a-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shoppingList")

const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const shoppingListEl = document.getElementById("Shopping-list")

addButtonEl.addEventListener("click", function () {
    let inputValue = inputFieldEl.value
    if (inputValue == "") {

    } else {
        push(shoppingListInDB, inputValue)
        clearInputFieldEl()
    }
})

onValue(shoppingListInDB, function (snapshot) {
    let noItems = "No items yet..."
    let itemArray = Object.entries(snapshot.val() || { noItems })

    clearShoppingListEl()

    for (let i = 0; i < itemArray.length; i++) {
        let currentItem = itemArray[i]

        let currentItemID = currentItem[0]
        let currentItemValue = currentItem[1]

        appendItemToShoppingListEl(currentItem)

    }

})

function clearShoppingListEl() {
    shoppingListEl.innerHTML = ''
}

function clearInputFieldEl() {
    inputFieldEl.value = ''
}

function appendItemToShoppingListEl(item) {
    let itemID = item[0]
    let itemValue = item[1]

    let newEl = document.createElement("li")

    newEl.textContent = itemValue

    newEl.addEventListener("dblclick", function () {
        let exactLocationofItemInDB = ref(database, `shoppingList/${itemID}`)

        remove(exactLocationofItemInDB)
    })

    shoppingListEl.append(newEl)
}