let lightLevel = 0
function playMusic(tempo: number, musicString: string) {
    music.setTempo(tempo)
    let sound = nerds.stringToNoteArray(musicString)
    nerds.playNoteArray(sound, MelodyOptions.Once)
}
bluetooth.onBluetoothConnected(function () {
    basic.showIcon(IconNames.Yes)
})
bluetooth.onBluetoothDisconnected(function () {
    basic.showIcon(IconNames.No)
})
bluetooth.onUartDataReceived(serial.delimiters(Delimiters.NewLine), function () {
    let text = bluetooth.uartReadUntil(serial.delimiters(Delimiters.NewLine))
    if (text.substring(0, 4) == "MSG:") {
        let message = text.substring(4) // Skip "MSG:" prefix
        bluetooth.uartWriteLine("MSG:" + message)
        serial.writeLine(message)
    } else if (text.substring(0, 6) == "MUSIC:") {
        let musicData = text.substring(6) // Skip "MUSIC:" prefix
        let parts = musicData.split("|")
        if (parts.length === 2) {
            let tempo = parseInt(parts[0])
            let musicString = parts[1]            
            // Play the music
            playMusic(tempo, musicString)
        }
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