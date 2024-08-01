document.getElementById('key-form').addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const accessKey = document.getElementById('access-key').value;
  
    const response = await fetch(`/verify-key?accessKey=${accessKey}`);
    if (response.ok) {
      document.getElementById('key-form').style.display = 'none';
      document.getElementById('inventory-form').style.display = 'block';
      loadInventoryHistory(); // Load inventory history after valid key is submitted
    } else {
      document.getElementById('key-error').style.display = 'block';
    }
  });
  
  document.getElementById('inventory-form').addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const namaBeras = e.target['nama-beras'].value.toLowerCase();
    const jumlahBeras = e.target['jumlah-beras'].value;
    const hargaBeras = e.target['harga-beras'].value;
  
    const response = await fetch('/add-inventory', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ namaBeras, jumlahBeras, hargaBeras })
    });
  
    if (response.ok) {
      alert('Inventory added successfully');
      e.target.reset();
      loadInventoryHistory();
    } else {
      alert('Error adding inventory');
    }
  });
  
  async function loadInventoryHistory() {
    const response = await fetch('/inventory-history');
    if (response.ok) {
      const history = await response.json();
      const historyTable = document.getElementById('inventory-history');
      historyTable.innerHTML = '';
      for (const [key, item] of Object.entries(history)) {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${item.namaBeras}</td>
          <td>${item.jumlahBeras}</td>
          <td>${item.hargaBeras}</td>
          <td>${item.timestamp}</td>
        `;
        historyTable.appendChild(row);
      }
    } else {
      console.error('Error fetching inventory history');
    }
  }
  
  // Initially load the inventory history
  loadInventoryHistory();
  