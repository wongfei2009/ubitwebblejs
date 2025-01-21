bluetooth.onBluetoothConnected(function () {
    basic.showIcon(IconNames.Yes)
})
bluetooth.onBluetoothDisconnected(function () {
    basic.showIcon(IconNames.No)
})
bluetooth.onUartDataReceived(serial.delimiters(Delimiters.NewLine), function () {
    let text = bluetooth.uartReadUntil(serial.delimiters(Delimiters.NewLine))
    bluetooth.uartWriteLine(text)
    serial.writeLine(text)
})
basic.showString("BLE")
bluetooth.startAccelerometerService()
bluetooth.startButtonService()
bluetooth.startTemperatureService()
bluetooth.startMagnetometerService()
bluetooth.startLEDService()
bluetooth.startUartService()