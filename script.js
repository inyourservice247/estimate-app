// ===== STATE MANAGEMENT =====
let rowCount = 1;

// ===== DOM ELEMENTS =====
const estimateTable = document.getElementById('estimateTable');
const tableBody = document.getElementById('tableBody');
const addItemBtn = document.getElementById('addItemBtn');
const downloadBtn = document.getElementById('downloadBtn');
const businessNameInput = document.getElementById('businessName');
const customerNameInput = document.getElementById('customerName');
const estimateDateInput = document.getElementById('estimateDate');
const subtotalEl = document.getElementById('subtotal');
const totalAmountEl = document.getElementById('totalAmount');

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    setTodayDate();
    attachEventListeners();
    calculateTotals();
});

// ===== SET TODAY'S DATE =====
function setTodayDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    estimateDateInput.value = `${year}-${month}-${day}`;
}

// ===== ATTACH EVENT LISTENERS =====
function attachEventListeners() {
    // Add item button
    addItemBtn.addEventListener('click', addNewRow);

    // Document-level event delegation for row inputs
    document.addEventListener('input', function(e) {
        if (e.target.matches('.input-qty, .input-rate')) {
            calculateRowAmount(e.target.closest('.item-row'));
            calculateTotals();
        }
    });

    // Download button
    downloadBtn.addEventListener('click', downloadAsJPEG);

    // Business name input for preview
    businessNameInput.addEventListener('change', updatePreview);
    customerNameInput.addEventListener('change', updatePreview);
    estimateDateInput.addEventListener('change', updatePreview);
}

// ===== ADD NEW ROW =====
function addNewRow() {
    rowCount++;

    const newRow = document.createElement('tr');
    newRow.className = 'item-row';
    newRow.setAttribute('data-row-id', rowCount);

    newRow.innerHTML = `
        <td class="col-sno"><span class="serial-number">${rowCount}</span></td>
        <td class="col-particular">
            <input type="text" class="input-particular" placeholder="Item description">
        </td>
        <td class="col-qty">
            <input type="number" class="input-qty" placeholder="0" value="0" min="0" step="1">
        </td>
        <td class="col-rate">
            <input type="number" class="input-rate" placeholder="0" value="0" min="0" step="0.01">
        </td>
        <td class="col-amount">
            <span class="amount-value">0.00</span>
        </td>
    `;

    tableBody.appendChild(newRow);
    calculateTotals();

    // Focus on the particular input for quick entry
    newRow.querySelector('.input-particular').focus();
}

// ===== CALCULATE ROW AMOUNT =====
function calculateRowAmount(row) {
    const qtyInput = row.querySelector('.input-qty');
    const rateInput = row.querySelector('.input-rate');
    const amountSpan = row.querySelector('.amount-value');

    const qty = parseFloat(qtyInput.value) || 0;
    const rate = parseFloat(rateInput.value) || 0;
    const amount = qty * rate;

    amountSpan.textContent = amount.toFixed(2);
}

// ===== CALCULATE TOTALS =====
function calculateTotals() {
    let subtotal = 0;

    // Sum all amounts
    document.querySelectorAll('.item-row').forEach(row => {
        const amountText = row.querySelector('.amount-value').textContent;
        const amount = parseFloat(amountText) || 0;
        subtotal += amount;
    });

    // Update display
    subtotalEl.textContent = subtotal.toFixed(2);
    totalAmountEl.textContent = subtotal.toFixed(2);
}

// ===== UPDATE PREVIEW DATA =====
function updatePreview() {
    document.getElementById('previewBusinessName').textContent = businessNameInput.value || 'Your Business';
    document.getElementById('previewCustomerName').textContent = customerNameInput.value || '-';
    
    const dateValue = estimateDateInput.value;
    if (dateValue) {
        const date = new Date(dateValue);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        document.getElementById('previewDate').textContent = date.toLocaleDateString('en-US', options);
    } else {
        document.getElementById('previewDate').textContent = '-';
    }
}

// ===== PREPARE PREVIEW FOR DOWNLOAD =====
function preparePreview() {
    // Update header info
    document.getElementById('previewBusinessName').textContent = businessNameInput.value || 'Your Business';
    document.getElementById('previewCustomerName').textContent = customerNameInput.value || 'N/A';
    
    const dateValue = estimateDateInput.value;
    if (dateValue) {
        const date = new Date(dateValue);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        document.getElementById('previewDate').textContent = date.toLocaleDateString('en-US', options);
    }

    // Clear and populate preview table
    const previewTableBody = document.getElementById('previewTableBody');
    previewTableBody.innerHTML = '';

    let serialNo = 1;
    document.querySelectorAll('.item-row').forEach(row => {
        const particular = row.querySelector('.input-particular').value || '-';
        const qty = row.querySelector('.input-qty').value || '0';
        const rate = row.querySelector('.input-rate').value || '0';
        const amount = row.querySelector('.amount-value').textContent || '0.00';

        const previewRow = document.createElement('tr');
        previewRow.innerHTML = `
            <td class="col-sno">${serialNo}</td>
            <td class="col-particular">${particular}</td>
            <td class="col-qty">${qty}</td>
            <td class="col-rate">${rate}</td>
            <td class="col-amount">${amount}</td>
        `;
        previewTableBody.appendChild(previewRow);
        serialNo++;
    });

    // Update totals in preview
    document.getElementById('previewSubtotal').textContent = subtotalEl.textContent;
    document.getElementById('previewTotalAmount').textContent = totalAmountEl.textContent;
}

// ===== DOWNLOAD AS JPEG =====
function downloadAsJPEG() {
    // Show loading state
    const originalText = downloadBtn.innerHTML;
    downloadBtn.innerHTML = '<span class="icon">⏳</span> Processing...';
    downloadBtn.disabled = true;

    // Prepare preview
    preparePreview();

    // Make preview visible temporarily
    const previewElement = document.getElementById('estimatePreview');
    const previewContainer = previewElement.querySelector('.preview-container');
    
    previewElement.style.display = 'block';
    previewElement.style.position = 'fixed';
    previewElement.style.left = '0';
    previewElement.style.top = '0';
    previewElement.style.width = '800px';
    previewElement.style.zIndex = '-9999';

    // Delay to ensure rendering
    setTimeout(() => {
        // Use html2canvas to capture the preview container
        html2canvas(previewContainer, {
            backgroundColor: '#ffffff',
            scale: 2,
            useCORS: true,
            logging: false,
            allowTaint: true,
            width: 800,
            height: previewContainer.scrollHeight
        }).then(canvas => {
            // Convert to JPEG
            const jpegData = canvas.toDataURL('image/jpeg', 0.95);

            // Create download link
            const link = document.createElement('a');
            const today = new Date();
            const dateStr = today.toISOString().split('T')[0];
            const customerName = customerNameInput.value.replace(/\s+/g, '_') || 'Estimate';
            link.download = `Estimate_${customerName}_${dateStr}.jpg`;
            link.href = jpegData;
            link.click();

            // Hide preview again
            previewElement.style.display = 'none';
            previewElement.style.position = 'absolute';
            previewElement.style.left = '-9999px';
            previewElement.style.top = '-9999px';

            // Reset button
            downloadBtn.innerHTML = originalText;
            downloadBtn.disabled = false;

            // Show success feedback
            showDownloadSuccess();
        }).catch(error => {
            console.error('Error generating image:', error);
            alert('Error generating estimate image. Please try again.');
            
            // Hide preview
            previewElement.style.display = 'none';
            previewElement.style.position = 'absolute';
            previewElement.style.left = '-9999px';
            previewElement.style.top = '-9999px';
            
            downloadBtn.innerHTML = originalText;
            downloadBtn.disabled = false;
        });
    }, 100);
}

// ===== SHOW DOWNLOAD SUCCESS FEEDBACK =====
function showDownloadSuccess() {
    const originalHTML = downloadBtn.innerHTML;
    downloadBtn.innerHTML = '<span class="icon">✓</span> Downloaded!';
    downloadBtn.style.background = '#10b981';

    setTimeout(() => {
        downloadBtn.innerHTML = originalHTML;
        downloadBtn.style.background = '';
    }, 2000);
}

// ===== UTILITY: FORMAT CURRENCY =====
function formatCurrency(value) {
    return parseFloat(value).toFixed(2);
}

// ===== KEYBOARD NAVIGATION =====
document.addEventListener('keydown', function(e) {
    if (e.key === 'Tab') {
        const activeElement = document.activeElement;
        
        // When tabbing out of the last amount column, add a new row
        if (activeElement.classList.contains('input-rate')) {
            const row = activeElement.closest('.item-row');
            if (row === tableBody.lastElementChild) {
                e.preventDefault();
                addNewRow();
            }
        }
    }
});
