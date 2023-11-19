document.addEventListener('DOMContentLoaded', function () {
    var checkAll = document.getElementById('checkAll');
    var itemCheckboxes = document.querySelectorAll('.item-checkbox');
    var quantityInputs = document.querySelectorAll('.numeric-input.quantity');
    var totalElements = document.querySelectorAll('[id^="total"]');
    var grandTotalElement = document.getElementById('grandTotal');
    var priceFilter = document.getElementById('priceFilter');
    var displayedRows = [];
    var checkedCheckboxes = [];

    checkAll.addEventListener('change', function () {
        var isChecked = checkAll.checked;
        itemCheckboxes.forEach(function (checkbox, index) {
            checkbox.checked = isChecked;
            updateQuantityInputState(index);
        });

        calculateTotal();
    });

    itemCheckboxes.forEach(function (checkbox, index) {
        checkbox.addEventListener('change', function () {
            if (checkbox.checked) {
                checkedCheckboxes.push(index);
            } else {
                checkedCheckboxes = checkedCheckboxes.filter(item => item !== index);
            }
            updateQuantityInputState(index);
            calculateTotal();
        });
    });

    quantityInputs.forEach(function (input, index) {
        input.addEventListener('input', function () {
            calculateTotal();
        });
    });

    priceFilter.addEventListener('change', function () {
        filterByPrice();
    });

    // Event listener for checkbox outside the functions
    document.getElementById('exampleCheckbox').addEventListener('change', function () {
        updateQuantityInputState(-1); // Pass -1 to update all quantity inputs
        calculateTotal();
    });

    function updateQuantityInputState(rowIndex) {
        if (rowIndex === -1) {
            itemCheckboxes.forEach(function (checkbox, index) {
                var quantityInput = quantityInputs[index];
                quantityInput.disabled = !checkbox.checked;
            });
        } else {
            var checkbox = itemCheckboxes[rowIndex];
            var quantityInput = quantityInputs[rowIndex];
            quantityInput.disabled = !checkbox.checked;
        }
    }

    function calculateTotal() {
        var grandTotal = 0;

        if (displayedRows.length === 0) {
            itemCheckboxes.forEach(function (checkbox, index) {
                if (checkbox.checked) {
                    var unitPrice = parseFloat(checkbox.parentElement.nextElementSibling.nextElementSibling.innerText.replace('$', '').replace(',', ''));
                    var quantity = parseFloat(quantityInputs[index].value);
                    var total = unitPrice * quantity;

                    totalElements[index].innerText = '$' + total.toFixed(2);
                    grandTotal += total;
                } else {
                    totalElements[index].innerText = '$' + '0.00';
                }
            });
        } else {
            displayedRows.forEach(function (rowIndex) {
                var checkbox = itemCheckboxes[rowIndex];
                if (checkbox.checked) {
                    var unitPrice = parseFloat(checkbox.parentElement.nextElementSibling.nextElementSibling.innerText.replace('$', '').replace(',', ''));
                    var quantity = parseFloat(quantityInputs[rowIndex].value);
                    var total = unitPrice * quantity;

                    totalElements[rowIndex].innerText = '$' + total.toFixed(2);
                    grandTotal += total;
                } else {
                    totalElements[rowIndex].innerText = '$' + '0.00';
                }
            });
        }

        grandTotalElement.innerText = '$' + grandTotal.toFixed(2);

        console.log("Checkbox states after calculating total:");
        itemCheckboxes.forEach(function (checkbox, index) {
            console.log(`Checkbox ${index + 1}: ${checkbox.checked ? 'checked' : 'unchecked'}`);
        });
    }

    function filterByPrice() {
        var selectedPrice = priceFilter.value;
        var rows = document.querySelectorAll('#shoppingTable tbody tr');
        displayedRows = [];
        checkedCheckboxes = [];
        var visibleItemCount = 0;

        rows.forEach(function (row, index) {
            if (row.querySelector('td[colspan="4"]')) {
                return;
            }

            var priceElement = row.querySelector('td:nth-child(3)');
            var checkbox = itemCheckboxes[index];

            if (priceElement) {
                var rowPrice = parseFloat(priceElement.innerText.replace('$', '').replace(',', ''));

                if (
                    selectedPrice === 'All' ||
                    (selectedPrice === '0 - 300' && rowPrice <= 300 && rowPrice >= 0) ||
                    (selectedPrice === '300 - 600' && rowPrice > 300 && rowPrice <= 600) ||
                    (selectedPrice === '> 600' && rowPrice > 600)
                ) {
                    row.style.display = '';
                    displayedRows.push(index);

                    if (checkbox.checked) {
                        checkedCheckboxes.push(index);
                    }
                } else {
                    row.style.display = 'none';
                }
            } else {
                console.error("Price element not found for row:", row);
            }
        });

        console.log("Checkbox states after filtering:");
        itemCheckboxes.forEach(function (checkbox, index) {
            console.log(`Checkbox ${index + 1}: ${checkbox.checked ? 'checked' : 'unchecked'}`);
        });

        calculateTotal();
    }
});


function loadHomePage() {
    // Sử dụng window.location.href để chuyển hướng trang hiện tại sang index.html
    window.location.href = '../index.html';
}






