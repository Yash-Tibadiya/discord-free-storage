document.getElementById("uploadForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const fileInput = document.getElementById("file");
  const file = fileInput.files[0];
  if (!file) {
    alert("Please select a file first.");
    return;
  }

  const uploadBtn = document.getElementById("uploadBtn");
  const uploadBtnText = document.getElementById("uploadBtnText");
  const uploadSpinner = document.getElementById("uploadSpinner");
  const uploadProgressBar = document.getElementById("uploadProgressBar");
  const progressBarContainer = document.querySelector(
    ".progress-bar-container"
  );
  const uploadSpeedDisplay = document.getElementById("uploadSpeed");

  uploadBtn.disabled = true;
  uploadBtnText.style.display = "none";
  uploadSpinner.style.display = "inline-block";
  progressBarContainer.style.display = "block";

  const formData = new FormData();
  formData.append("file", file);

  const xhr = new XMLHttpRequest();
  let startTime = Date.now();

  xhr.upload.addEventListener("progress", function (e) {
    if (e.lengthComputable) {
      const percentComplete = (e.loaded / e.total) * 100;
      uploadProgressBar.style.width = percentComplete.toFixed(2) + "%";
      uploadProgressBar.innerText = percentComplete.toFixed(2) + "%";

      const currentTime = Date.now();
      const elapsedTime = (currentTime - startTime) / 1000; // seconds
      const speed = e.loaded / elapsedTime; // bytes/second
      const speedKBps = (speed / 1024 / 1024).toFixed(2);
      uploadSpeedDisplay.innerText = `Upload speed: ${speedKBps} MB/s`;
    }
  });

  xhr.upload.addEventListener("load", function () {
    uploadBtn.disabled = false;
    uploadBtnText.style.display = "inline-block";
    uploadSpinner.style.display = "none";
    progressBarContainer.style.display = "none";
    // document.write("File uploaded successfully.");
    window.location.reload();
  });

  xhr.upload.addEventListener("error", function () {
    uploadBtn.disabled = false;
    uploadBtnText.style.display = "inline-block";
    uploadSpinner.style.display = "none";
    progressBarContainer.style.display = "none";
    alert("An error occurred during the upload. Please try again.");
  });

  xhr.open("POST", "/", true);
  xhr.send(formData);
});

document.querySelectorAll(".download-btn").forEach((button) => {
  button.addEventListener("click", function (e) {
    e.preventDefault();
    const url = this.href;

    const downloadProgressBar = document.createElement("div");
    downloadProgressBar.classList.add("progress-bar");
    downloadProgressBar.setAttribute("role", "progressbar");
    downloadProgressBar.style.width = "0%";
    downloadProgressBar.innerText = "0%";

    const progressBarContainer = document.createElement("div");
    progressBarContainer.classList.add("progress", "progress-bar-container");
    progressBarContainer.appendChild(downloadProgressBar);

    const speedDisplay = document.createElement("div");
    speedDisplay.classList.add("speed-display");
    speedDisplay.innerText = "Download speed: 0 KB/s";

    this.parentNode.appendChild(progressBarContainer);
    this.parentNode.appendChild(speedDisplay);

    const xhr = new XMLHttpRequest();
    let startTime = Date.now();
    xhr.open("GET", url, true);
    xhr.responseType = "blob";

    xhr.addEventListener("progress", function (e) {
      if (e.lengthComputable) {
        const percentComplete = (e.loaded / e.total) * 100;
        downloadProgressBar.style.width = percentComplete.toFixed(2) + "%";
        downloadProgressBar.innerText = percentComplete.toFixed(2) + "%";

        const currentTime = Date.now();
        const elapsedTime = (currentTime - startTime) / 1000; // seconds
        const speed = e.loaded / elapsedTime; // bytes/second
        const speedKBps = (speed / 1024).toFixed(2);
        speedDisplay.innerText = `Download speed: ${speedKBps} KB/s`;
      }
    });

    xhr.addEventListener("load", function () {
      if (xhr.status === 200) {
        const blob = xhr.response;
        const downloadUrl = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = downloadUrl;
        a.download = url.split("/").pop();
        document.body.appendChild(a);
        a.click();
        setTimeout(() => {
          URL.revokeObjectURL(downloadUrl);
          document.body.removeChild(a);
        }, 100);

        progressBarContainer.style.display = "none";
        speedDisplay.style.display = "none";
      }
    });

    xhr.addEventListener("error", function () {
      alert("An error occurred during the download. Please try again.");
      progressBarContainer.style.display = "none";
      speedDisplay.style.display = "none";
    });

    xhr.send();
  });
});

function toggleSelectAll() {
  const checkboxes = document.querySelectorAll(".file-checkbox");
  const selectAllCheckbox = document.getElementById("selectAllCheckbox");
  const allChecked = Array.from(checkboxes).every(
    (checkbox) => checkbox.checked
  );
  checkboxes.forEach((checkbox) => (checkbox.checked = !allChecked));
  selectAllCheckbox.checked = !allChecked;
}

function searchFiles() {
  const input = document.getElementById("searchInput");
  const filter = input.value.toLowerCase();
  const table = document.getElementById("fileTable");
  const trs = table.getElementsByTagName("tr");

  for (let i = 1; i < trs.length; i++) {
    const tds = trs[i].getElementsByTagName("td");
    let showRow = false;

    for (let j = 1; j < tds.length; j++) {
      const td = tds[j];
      if (td) {
        const textValue = td.textContent || td.innerText;
        if (textValue.toLowerCase().indexOf(filter) > -1) {
          showRow = true;
          break;
        }
      }
    }

    trs[i].style.display = showRow ? "" : "none";
  }
}

function sortTable(n) {
  const table = document.getElementById("fileTable");
  let rows,
    switching,
    i,
    x,
    y,
    shouldSwitch,
    dir,
    switchcount = 0;
  switching = true;
  dir = "asc";

  while (switching) {
    switching = false;
    rows = table.rows;

    for (i = 1; i < rows.length - 1; i++) {
      shouldSwitch = false;
      x = rows[i].getElementsByTagName("TD")[n];
      y = rows[i + 1].getElementsByTagName("TD")[n];

      if (dir === "asc") {
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          shouldSwitch = true;
          break;
        }
      } else if (dir === "desc") {
        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
          shouldSwitch = true;
          break;
        }
      }
    }

    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      switchcount++;
    } else {
      if (switchcount === 0 && dir === "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
}
