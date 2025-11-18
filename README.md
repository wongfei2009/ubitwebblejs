# ubitwebblejs

This project turns a BBC micro:bit into a versatile Bluetooth Low Energy (BLE) device that can be controlled from a web browser. It allows a web-based client to interact with the micro:bit's sensors and actuators.

> Try it out with the companion web app: [https://wongfei2009.github.io/ubitwebblejs/](https://wongfei2009.github.io/ubitwebblejs/)

## Features

*   Read data from the accelerometer, magnetometer, and temperature sensor.
*   Check the state of the A and B buttons.
*   Control the 5x5 LED matrix.
*   Communicate with the micro:bit over a UART (serial) connection.
*   Continuously sends ambient light level readings over the Bluetooth UART connection.
*   A music player that can play tunes sent from the connected web client.

## How it Works

The micro:bit runs a program that initializes a number of Bluetooth services. A connected device can then use these services to interact with the micro:bit.

### Music Player

A connected client can send music to the micro:bit in chunks over the UART connection. The protocol is as follows:

1.  A message with a `MUSIC:` prefix is sent to set the tempo.
2.  The music data is sent in one or more messages with a `CHUNK:` prefix.
3.  The last chunk must contain the string `|END` to signify the end of the music data.
4.  The micro:bit assembles the chunks and then uses a custom library to parse the music string and play it.

## Use as Extension

This repository can be added as an **extension** in MakeCode.

* open [https://makecode.microbit.org/](https://makecode.microbit.org/)
* click on **New Project**
* click on **Extensions** under the gearwheel menu
* search for **https://github.com/wongfei2009/ubitwebblejs** and import

## Edit this project

To edit this repository in MakeCode.

* open [https://makecode.microbit.org/](https://makecode.microbit.org/)
* click on **Import** then click on **Import URL**
* paste **https://github.com/wongfei2009/ubitwebblejs** and click import

#### Metadata (used for search, rendering)

* for PXT/microbit
<script src="https://makecode.com/gh-pages-embed.js"></script><script>makeCodeRender("{{ site.makecode.home_url }}", "{{ site.github.owner_name }}/{{ site.github.repository_name }}");</script>