const calculateForm = document.getElementById("calculateForm");
const calculateContactForm = document.getElementById(
  "calculateContactForm"
);

const selectedServicesCount = document.getElementById(
  "selectedServicesCount"
);

const calculateError = document.getElementById("calculateError");
const calculateContactError = document.getElementById(
  "calculateContactError"
);

const calculateModal = document.getElementById("calculateModal");

function getSelectedCalculateServices() {
  return [
    ...document.querySelectorAll(
      '#calculateForm input[name="services"]:checked'
    )
  ].map((checkbox) => checkbox.value);
}

function updateSelectedServicesCount() {
  const selectedServices = getSelectedCalculateServices();

  selectedServicesCount.textContent = selectedServices.length;
  calculateError.textContent = "";
}

document
  .querySelectorAll('#calculateForm input[name="services"]')
  .forEach((checkbox) => {
    checkbox.addEventListener(
      "change",
      updateSelectedServicesCount
    );
  });

function openCalculateModal() {
  calculateModal.classList.add("open");
  document.body.classList.add("calculate-modal-open");
}

function closeCalculateModal() {
  calculateModal.classList.remove("open");
  document.body.classList.remove("calculate-modal-open");
}

document
  .querySelectorAll("[data-close-calculate-modal]")
  .forEach((element) => {
    element.addEventListener("click", closeCalculateModal);
  });

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeCalculateModal();
  }
});

calculateForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const selectedServices = getSelectedCalculateServices();

  if (selectedServices.length === 0) {
    calculateError.textContent =
      "Please select at least one service.";

    return;
  }

  openCalculateModal();
});

calculateContactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const selectedServices = getSelectedCalculateServices();

  const firstName = document
    .getElementById("calculateFirstName")
    .value.trim();

  const lastName = document
    .getElementById("calculateLastName")
    .value.trim();

  const company = document
    .getElementById("calculateCompany")
    .value.trim();

  const email = document
    .getElementById("calculateEmail")
    .value.trim();

  const phone = document
    .getElementById("calculatePhone")
    .value.trim();

  const projectDetails = document
    .getElementById("projectDetails")
    .value.trim();

  const consent = document.getElementById(
    "calculateConsent"
  ).checked;

  if (!firstName || !lastName || !email || !consent) {
    calculateContactError.textContent =
      "Please complete all required fields.";

    return;
  }

  calculateContactError.textContent = "";

  const destinationEmail = "hello@rockstat.com";

  const subject = encodeURIComponent(
    "New personalized proposal request"
  );

  const body = encodeURIComponent(
`Name: ${firstName} ${lastName}
Company: ${company || "Not provided"}
Email: ${email}
Phone / WhatsApp: ${phone || "Not provided"}

Selected services:
${selectedServices.join(", ")}

Additional information:
${projectDetails || "Not provided"}`
  );

  window.location.href =
    `mailto:${destinationEmail}?subject=${subject}&body=${body}`;
});

updateSelectedServicesCount();
