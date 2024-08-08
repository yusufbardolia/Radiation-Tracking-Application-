// Data viewer so that data can be displayed and control on the frontend through slider
let map;
let markers=[]
function coloredMarkers(flag){
  if (flag==1)
    color = "orange";
  else if (flag==2)
    color = "red";
  else
    color = "green";
  return  new L.Icon({
      iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png`,
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });
}

function dataViewer() {
  const socket = new WebSocket("ws://localhost:8080");  
  map = L.map("map").setView([0, 0], 3);
  markers = [];
  let a = [];
  let messageQueue = [];
  let isProcessing = false;
  let speed = 5000;

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap contributors",
  }).addTo(map);

  const speedValueLabel = document.getElementById("speedValue");
  // Update speed when slider value changes
  document.getElementById("speedSlider").addEventListener("input", function(event) {
    speed = parseInt(event.target.value);
    speedValueLabel.textContent = speed/1000;

  });
  socket.addEventListener("message", function(event) {
    try {
      const message = JSON.parse(event.data);
      let messageValue = message.value;
      messageValueSplitted= messageValue.split(",")
      dataArray=[{"Latitude":messageValueSplitted[0],"Longitude":messageValueSplitted[1],"Value":messageValueSplitted[2],"Flag":messageValueSplitted[3]}]
      // Replace NaN values with null to make it valid JSON
      messageValue = messageValue.replace(/NaN/g, "null");
      const data = dataArray[0]; // Get the first (and only) element of the array
      messageQueue.push(data);
      if (!isProcessing) {
        processMessages();
      }
    } catch (error) {
      console.error("Error processing message:", error);
    }
  });
  function processMessages() {
    if (messageQueue.length === 0) {
      isProcessing = false;
      return;
    }

    isProcessing = true;
    const data = messageQueue.shift();
    a.push(data);
    const latitude = data.Latitude;
    const longitude = data.Longitude;
    const value = data.Value;

    // Clear old markers
    markers.forEach((marker) => {
      map.removeLayer(marker);
    });
    markers = [];
    if (a.length == 50) {
      // Clear the message list
      let messageList = document.getElementById("messages");
      messageList.innerHTML = "";
  
      // Clear markers and reset array
      a.forEach((a) => {
        map.removeLayer(a);
      });
      markers = [];
      a = [];
    }

    a.forEach((a) => {
      // Add new marker to the map
      const marker = L.marker([a.Latitude, a.Longitude],{
        icon:coloredMarkers(a.Flag)
      }).addTo(map);
      marker
        .bindPopup(
          `<b>Radiation Value: ${a.Value}</b><br>Latitude: ${a.Latitude}
          <br>Longitude: ${a.Longitude}`
        )
        .openPopup();
      markers.push(marker);

      // Add message to the list
      let messageList = document.getElementById("messages");
      let li = document.createElement("li");
      li.innerHTML = `Latitude: ${a.Latitude}<br>Longitude: ${a.Longitude}<br>Radiation Value: ${a.Value}`;
      messageList.appendChild(li);
    });

    // Set a timeout based on the speed value
    setTimeout(processMessages, speed);
  }
}

function zoomIn() {
    map.zoomIn();
}
function zoomOut() {
    map.zoomOut();
}

function centerMap() {
    map.setView([0, 0], 2);
}

function clearMarkers() {
    markers.forEach((marker) => map.removeLayer(marker));
    markers = [];
  }
  function toggleSidebar() {
    const sidebar = document.getElementById("sidebar");
    const toggleButton = document.querySelector(".toggle-button");
    const mapContainer = document.getElementById("map-container");

    if (sidebar.style.width === "20%") {
        // Close sidebar
        sidebar.style.width = "0";
        toggleButton.textContent = "+";
        mapContainer.style.marginLeft = "0";
    } else {
        // Open sidebar
        sidebar.style.width = "20%";
        toggleButton.textContent = "-";
        mapContainer.style.marginLeft = "20%";
    }
  }
  

  
