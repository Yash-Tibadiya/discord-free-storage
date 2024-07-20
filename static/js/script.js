// document.getElementById("uploadForm").addEventListener("submit", function () {
//   var btn = document.getElementById("uploadBtn");
//   var text = document.getElementById("uploadBtnText");
//   var spinner = document.getElementById("uploadSpinner");

//   // Replace text with spinner and disable button
//   text.style.display = "none";
//   spinner.style.display = "";
//   btn.disabled = true;
// });

// function searchFiles() {
//   var input, filter, table, tr, td, i, txtValue;
//   input = document.getElementById("searchInput");
//   filter = input.value.toUpperCase();
//   table = document.getElementById("fileTable");
//   tr = table.getElementsByTagName("tr");

//   for (i = 0; i < tr.length; i++) {
//     // Get the first cell (ID)
//     tdId = tr[i].getElementsByTagName("td")[1];
//     // Get the second cell (File Name)
//     tdName = tr[i].getElementsByTagName("td")[2];

//     if (tdId || tdName) {
//       txtValueId = tdId ? tdId.textContent || tdId.innerText : "";
//       txtValueName = tdName ? tdName.textContent || tdName.innerText : "";

//       if (
//         txtValueId.toUpperCase().indexOf(filter) > -1 ||
//         txtValueName.toUpperCase().indexOf(filter) > -1
//       ) {
//         tr[i].style.display = "";
//       } else {
//         tr[i].style.display = "none";
//       }
//     }
//   }
// }

// function sortTable(columnIndex) {
//   var table,
//     rows,
//     switching,
//     i,
//     x,
//     y,
//     shouldSwitch,
//     dir,
//     switchCount = 0;
//   table = document.getElementById("fileTable");
//   switching = true;
//   // Set the sorting direction to ascending initially
//   dir = "asc";

//   while (switching) {
//     switching = false;
//     rows = table.rows;
//     for (i = 1; i < rows.length - 1; i++) {
//       shouldSwitch = false;
//       x = rows[i].getElementsByTagName("TD")[columnIndex];
//       y = rows[i + 1].getElementsByTagName("TD")[columnIndex];

//       // Check if the rows should switch place, depending on the direction
//       if (dir == "asc") {
//         if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
//           shouldSwitch = true;
//           break;
//         }
//       } else if (dir == "desc") {
//         if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
//           shouldSwitch = true;
//           break;
//         }
//       }
//     }
//     if (shouldSwitch) {
//       rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
//       switching = true;
//       switchCount++;
//     } else {
//       if (switchCount == 0 && dir == "asc") {
//         dir = "desc";
//         switching = true;
//       }
//     }
//   }
// }

// document.addEventListener("DOMContentLoaded", (event) => {
//   setTimeout(function () {
//     let alerts = document.querySelectorAll(".alert");
//     alerts.forEach(function (alert) {
//       // Add the fade-out class
//       alert.classList.add("alert-fading-out");

//       // Wait for the fade-out to finish before closing
//       setTimeout(() => {
//         new bootstrap.Alert(alert).close();
//       }, 500); // This should match the duration in the CSS
//     });
//   }, 2000); // Time before starting the fade-out
// });

// // Function to toggle all file checkboxes based on the state of the "select all" checkbox
// function toggleTableCheckboxes(selectAllCheckbox) {
//   // Get all file checkboxes in the table
//   const checkboxes = document.querySelectorAll(".file-checkbox");
//   // Set each file checkbox's checked status to match the "select all" checkbox
//   checkboxes.forEach((checkbox) => {
//     checkbox.checked = selectAllCheckbox.checked;
//   });
// }

// // Function to toggle the "select all" checkbox based on individual checkbox changes
// function updateSelectAllCheckbox() {
//   const allCheckboxes = document.querySelectorAll(".file-checkbox");
//   const selectAllCheckbox = document.getElementById("selectAllCheckbox");
//   // Check if all file checkboxes are checked
//   selectAllCheckbox.checked = Array.from(allCheckboxes).every(
//     (checkbox) => checkbox.checked
//   );
//   // If not all are checked, also ensure the "select all" checkbox is not checked
//   if (!selectAllCheckbox.checked) {
//     // Check if any file checkboxes are checked
//     const anyChecked = Array.from(allCheckboxes).some(
//       (checkbox) => checkbox.checked
//     );
//     // Indeterminate state when some but not all checkboxes are checked
//     selectAllCheckbox.indeterminate = anyChecked;
//   } else {
//     // No indeterminate state when all are checked
//     selectAllCheckbox.indeterminate = false;
//   }
// }

// // Function to toggle select all / deselect all for checkboxes
// function toggleSelectAll() {
//   const allCheckboxes = document.querySelectorAll(".file-checkbox");
//   const selectAllCheckbox = document.getElementById("selectAllCheckbox");
//   // Determine if we are selecting all or deselecting all
//   const selectAll = !Array.from(allCheckboxes).every(
//     (checkbox) => checkbox.checked
//   );
//   // Set all checkboxes to the new state
//   allCheckboxes.forEach((checkbox) => {
//     checkbox.checked = selectAll;
//   });
//   // Update the state of the "select all" checkbox
//   selectAllCheckbox.checked = selectAll;
//   selectAllCheckbox.indeterminate = false; // Remove indeterminate state when manually toggling
// }

// // Add event listeners to file checkboxes to update the "select all" checkbox appropriately
// document.addEventListener("DOMContentLoaded", () => {
//   const fileCheckboxes = document.querySelectorAll(".file-checkbox");
//   fileCheckboxes.forEach((checkbox) => {
//     // When a checkbox is clicked, update the "select all" checkbox
//     checkbox.addEventListener("change", updateSelectAllCheckbox);
//   });
// });

// function startExport() {
//   const selectedIds = Array.from(
//     document.querySelectorAll(".file-checkbox:checked")
//   ).map((cb) => cb.getAttribute("data-file-id"));

//   fetch("/export", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/x-www-form-urlencoded",
//     },
//     body: "selected_ids[]=" + selectedIds.join("&selected_ids[]="),
//   })
//     .then((response) => {
//       if (response.ok) return response.blob();
//       throw new Error("Network response was not ok.");
//     })
//     .then((blob) => {
//       const url = window.URL.createObjectURL(blob);
//       const a = document.createElement("a");
//       a.href = url;
//       a.download = "exported_files.db";
//       document.body.appendChild(a);
//       a.click();
//       a.remove();
//       window.URL.revokeObjectURL(url);
//       // Reload the page after a slight delay to allow the download to initiate
//       setTimeout(() => {
//         window.location.reload();
//       }, 1000);
//     })
//     .catch((error) => console.error("Error exporting files:", error));
// }

// function startImport() {
//   // Create a file input element
//   let fileInput = document.createElement("input");
//   fileInput.type = "file";
//   fileInput.accept = ".db"; // Accept only .db files
//   fileInput.onchange = (e) => {
//     // Create a new FormData object and append the file
//     let formData = new FormData();
//     formData.append("db_file", e.target.files[0]);

//     // Send the FormData object to the server using fetch
//     fetch("/import", {
//       method: "POST",
//       body: formData,
//     })
//       .then((response) => {
//         if (response.ok) {
//           // Reload the page to reflect the imported data
//           window.location.reload();
//         } else {
//           alert("Failed to import the database.");
//         }
//       })
//       .catch((error) => {
//         console.error("Error importing files:", error);
//         alert("Error importing files.");
//       });
//   };
//   // Click the file input to open the file dialog
//   fileInput.click();
// }

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
    document.write("File uploaded successfully.");
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
