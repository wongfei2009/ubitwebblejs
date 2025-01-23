let lightLevel = 0
let currentTempo = 1040;
let musicBuffer = "";
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
    
    if (text.substr(0, 4) == "MSG:") {
        let message = text.substr(4)
        bluetooth.uartWriteLine("MSG:" + message)
        serial.writeLine(message)
    } else if (text.substr(0, 6) == "MUSIC:") {
        // Reset the buffer and store the tempo
        musicBuffer = ""
        let tempoStr = text.substr(6).replace("|", "")
        currentTempo = parseInt(tempoStr)
    } else if (text.substr(0, 6) == "CHUNK:") {
        let chunk = text.substr(6)
        if (chunk.indexOf("|END") > -1) {
            // This is the last chunk
            chunk = chunk.replace("|END", "")
            musicBuffer += chunk
            // Play the complete music string
            playMusic(currentTempo, musicBuffer)
            // Reset buffer
            musicBuffer = ""
        } else {
            // Add chunk to buffer
            musicBuffer += chunk
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