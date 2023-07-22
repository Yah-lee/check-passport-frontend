<template>
    <div>
      <video id="scanner-video"></video>
      <button @click="startScan">Start Scan</button>
    </div>
  </template>
  
  <script>
  import Quagga from 'quagga';
  
  export default {
    mounted() {
      Quagga.init({
        inputStream: {
          name: "Live",
          type: "LiveStream",
          target: "#scanner-video",
        },
      });
    },
    methods: {
      startScan() {
        Quagga.start();
      },
    },
  };
  </script>
  