// Import the MQTT library
const mqtt = require("mqtt");

// Connect to mqtt client
const mqttClient = mqtt.connect("mqtt://api.waziup.io");

// Obtain the device and sensor ID from the wazicloud. Ensure you have devices set up already
const deviceId = 'ESPDEVICE';
const sensorId = 'TC';

// Declare a topic (endpoint) where we want to listen update from
const topic = `devices/${deviceId}/sensors/${sensorId}/value`;
// When we are connected to the client, subscribe to the defined topic
  mqttClient.on("connect", ()=>{
    mqttClient.subscribe(topic, (error)=>{
      if (error) {
      console.log("Failed to connect MQTT");
      } else {
      console.log(`Connected to MQTT \nTopic: ${topic}`);
    }
  })
})

// Update the UI when we receive data
  mqttClient.on("message", (receivedTopic, message)=>{
  console.log("Received...")
  console.log("Topic: ", receivedTopic);
  console.log(message);
  document.getElementById("val").innerHTML = message.value
})
