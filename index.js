const counters = {};
    const history = [];
    const payments = [];

    const counterContainer = document.getElementById('counters');
    const totalBooksEl = document.getElementById('total-books');
    const totalPaymentEl = document.getElementById('total-payment');
    const paymentListEl = document.getElementById('payment-list');
    const paymentInput = document.getElementById('payment-input');

    document.querySelectorAll('.book-btn').forEach(btn => {
      const book = btn.dataset.book;
      counters[book] = 0;

      const counterEl = document.createElement('div');
      counterEl.className = 'counter-item';
      counterEl.id = `counter-${book}`;
      counterEl.innerText = `${book}: 0`;
      counterContainer.appendChild(counterEl);

      btn.addEventListener('click', () => {
        counters[book]++;
        history.push({ type: 'book', book });
        updateCounters();
      });
    });

    function updateCounters() {
      let total = 0;
      for (const book in counters) {
        total += counters[book];
        const el = document.getElementById(`counter-${book}`);
        el.innerText = `${book}: ${counters[book]}`;
      }
      totalBooksEl.innerText = total;
    }

  function undoLastAction() {
        while (history.length > 0) {
      const last = history.pop();
      if (last.type === 'book' && counters[last.book] > 0) {
        counters[last.book]--;
        updateCounters();
        break;
      }
    }
  }

    function addPayment() {
      const value = parseFloat(paymentInput.value);
      if (isNaN(value) || value <= 0) return;

      payments.push(value);
      history.push({ type: 'payment', amount: value });
      paymentInput.value = '';
      updatePayments();
    }

    function updatePayments() {
      paymentListEl.innerHTML = '';
      let total = 0;

      payments.forEach((amount, index) => {
        total += amount;
        const div = document.createElement('div');
        div.className = 'payment-item';
        div.innerHTML = `${amount} грн <span class="remove-payment" onclick="removePayment(${index})">✖</span>`;
        paymentListEl.appendChild(div);
      });

      totalPaymentEl.innerText = total;
    }

    function removePayment(index) {
      payments.splice(index, 1);
      updatePayments();
    }

    paymentInput.addEventListener('keydown', function (event) {
      if (event.key === 'Enter') {
        addPayment();
      }
    });