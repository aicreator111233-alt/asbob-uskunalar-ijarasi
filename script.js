const catalog = document.getElementById("catalog");
const detailModal = document.getElementById("detail-modal");
const confirmModal = document.getElementById("confirm-modal");
const form = document.getElementById("rental-form");
const nameInput = document.getElementById("customer-name");
const daysInput = document.getElementById("days");
const nameError = document.getElementById("name-error");
const daysError = document.getElementById("days-error");
const totalPrice = document.getElementById("total-price");

let selectedTool = null;

function formatPrice(amount) {
  return amount.toLocaleString("ru-RU") + " so'm";
}

function renderCards() {
  tools.forEach(function (tool) {
    const card = document.createElement("article");
    card.className = "card";
    card.tabIndex = 0;
    card.setAttribute("role", "button");

    card.innerHTML =
      '<img alt="">' +
      '<div class="card-body">' +
      '<p class="tool-id"></p>' +
      "<h3></h3>" +
      '<p class="desc"></p>' +
      '<p class="price"></p>' +
      "</div>";

    const img = card.querySelector("img");
    img.src = tool.image;
    img.alt = tool.name;
    card.querySelector(".tool-id").textContent = "ID: " + tool.id;
    card.querySelector("h3").textContent = tool.name;
    card.querySelector(".desc").textContent = tool.description;
    card.querySelector(".price").textContent = formatPrice(tool.pricePerDay) + " / kun";

    card.addEventListener("click", function () {
      openDetail(tool);
    });
    card.addEventListener("keydown", function (event) {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openDetail(tool);
      }
    });

    catalog.appendChild(card);
  });
}

function openDetail(tool) {
  selectedTool = tool;

  document.getElementById("d-image").src = tool.image;
  document.getElementById("d-image").alt = tool.name;
  document.getElementById("d-id").textContent = "ID: " + tool.id;
  document.getElementById("d-name").textContent = tool.name;
  document.getElementById("d-desc").textContent = tool.description;
  document.getElementById("d-price").textContent = formatPrice(tool.pricePerDay) + " / kun";

  form.reset();
  daysInput.value = "1";
  clearErrors();
  updateTotal();

  detailModal.hidden = false;
  nameInput.focus();
}

function closeDetail() {
  detailModal.hidden = true;
  selectedTool = null;
}

function checkName() {
  const name = nameInput.value.trim();
  if (name === "") {
    return { ok: false, message: "Ismni kiriting" };
  }
  return { ok: true, value: name };
}

function checkDays() {
  const text = daysInput.value.trim();
  if (text === "") {
    return { ok: false, message: "Kunlar sonini kiriting (1 dan 7 gacha)" };
  }
  if (!/^[1-7]$/.test(text)) {
    return { ok: false, message: "Kunlar soni 1 dan 7 gacha butun son bo'lishi kerak" };
  }
  return { ok: true, value: Number(text) };
}

function showError(input, errorEl, message) {
  errorEl.textContent = message;
  errorEl.hidden = false;
  input.classList.add("invalid");
}

function clearErrors() {
  nameError.hidden = true;
  daysError.hidden = true;
  nameInput.classList.remove("invalid");
  daysInput.classList.remove("invalid");
}

function updateTotal() {
  const result = checkDays();
  if (result.ok && selectedTool) {
    totalPrice.textContent = formatPrice(selectedTool.pricePerDay * result.value);
  } else {
    totalPrice.textContent = "—";
  }
}

daysInput.addEventListener("input", function () {
  daysError.hidden = true;
  daysInput.classList.remove("invalid");
  updateTotal();
});

nameInput.addEventListener("input", function () {
  nameError.hidden = true;
  nameInput.classList.remove("invalid");
});

form.addEventListener("submit", function (event) {
  event.preventDefault();
  clearErrors();

  const nameResult = checkName();
  const daysResult = checkDays();

  if (!nameResult.ok) showError(nameInput, nameError, nameResult.message);
  if (!daysResult.ok) showError(daysInput, daysError, daysResult.message);
  if (!nameResult.ok || !daysResult.ok) return;

  const total = selectedTool.pricePerDay * daysResult.value;

  document.getElementById("c-name").textContent = nameResult.value;
  document.getElementById("c-tool").textContent = selectedTool.name;
  document.getElementById("c-days").textContent = daysResult.value + " kun";
  document.getElementById("c-total").textContent = formatPrice(total);

  detailModal.hidden = true;
  confirmModal.hidden = false;
});

document.getElementById("detail-close").addEventListener("click", closeDetail);

document.getElementById("confirm-close").addEventListener("click", function () {
  confirmModal.hidden = true;
  selectedTool = null;
});

detailModal.addEventListener("click", function (event) {
  if (event.target === detailModal) closeDetail();
});

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    if (!confirmModal.hidden) {
      confirmModal.hidden = true;
    } else if (!detailModal.hidden) {
      closeDetail();
    }
  }
});

renderCards();
// Application initialization
console.log("Asbob-uskunalar ijarasi tizimi ishga tushdi.");