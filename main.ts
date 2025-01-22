let lightLevel = 0
bluetooth.onBluetoothConnected(function () {
    basic.showIcon(IconNames.Yes)
})
bluetooth.onBluetoothDisconnected(function () {
    basic.showIcon(IconNames.No)
})
bluetooth.onUartDataReceived(serial.delimiters(Delimiters.NewLine), function () {
    let text = bluetooth.uartReadUntil(serial.delimiters(Delimiters.NewLine))
    if (text.substr(0, 4) == "MSG:") {
        let message = text.substr(4) // Skip "MSG:" prefix
        bluetooth.uartWriteLine("MSG:" + message)
        serial.writeLine(message)
    }
})
basic.forever(function () {
    lightLevel = input.lightLevel()
    bluetooth.uartWriteLine("LIGHT:" + lightLevel.toString())
    basic.pause(100)
})
basic.showString("BLE")
bluetooth.startAccelerometerService()
bluetooth.startButtonService()
bluetooth.startTemperatureService()
bluetooth.startMagnetometerService()
bluetooth.startLEDService()
bluetooth.startUartService()