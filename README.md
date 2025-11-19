# ubitwebblejs

This project turns a BBC micro:bit into a versatile Bluetooth Low Energy (BLE) device that can be controlled from a web browser. It allows a web-based client to interact with the micro:bit's sensors and actuators.

> Try it out with the companion web app: [https://wongfei2009.github.io/microbit-webble-p5js/](https://wongfei2009.github.io/microbit-webble-p5js/)

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

## Build and Deploy

### Prerequisites

* Node.js (v14 or higher)
* npm (comes with Node.js)

### Setup

1. Clone the repository:
```bash
git clone https://github.com/wongfei2009/ubitwebblejs.git
cd ubitwebblejs
```

2. Install PXT command-line tools and set up the micro:bit target:
```bash
npm install -g pxt
pxt target microbit
```

3. Install project dependencies:
```bash
pxt install
```

### Building

To build the project and generate the `.hex` file:

```bash
pxt build
```

Or use the Makefile:
```bash
make build
```

The compiled files will be generated in the `built/` directory. The main file is `built/binary.hex`.

### Deploying

**Option 1: Automatic deployment** (if micro:bit is connected via USB):
```bash
pxt deploy
```

Or use the Makefile:
```bash
make deploy
```

**Option 2: Manual deployment**:
1. Connect your micro:bit to your computer via USB
2. The micro:bit will appear as a USB drive named "MICROBIT"
3. Copy the `built/binary.hex` file to the MICROBIT drive
4. The micro:bit will automatically flash the new program

### Important Notes

- This project uses **Bluetooth** services, which are incompatible with the **Radio** module in MakeCode
- Make sure only Bluetooth (not Radio) is listed in the dependencies in `pxt.json`
- After flashing, the micro:bit will display "BLE" on the LED matrix when ready