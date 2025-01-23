let lightLevel = 0
// Variables for tracking music chunks
let musicBuffer = ""
let currentTempo = 120
let expectedChunkIndex = 0
let totalExpectedChunks = 0

function playMusic(tempo: number, musicString: string) {
    try {
        music.setTempo(tempo)
        let sound = nerds.stringToNoteArray(musicString)
        nerds.playNoteArray(sound, MelodyOptions.Once)
        bluetooth.uartWriteLine("PLAYING")
    } catch (e) {
        bluetooth.uartWriteLine("ERROR:PLAY")
    }
}

bluetooth.onBluetoothConnected(function () {
    basic.showIcon(IconNames.Yes)
})

bluetooth.onBluetoothDisconnected(function () {
    basic.showIcon(IconNames.No)
})

bluetooth.onUartDataReceived(serial.delimiters(Delimiters.Pipe), function () {
    let data = bluetooth.uartReadUntil(serial.delimiters(Delimiters.Pipe))
    
    if (data.includes("MUSIC_START:")) {
        // Format: MUSIC_START:tempo:totalChunks|
        let parts = data.split(":")
        currentTempo = parseInt(parts[1])
        totalExpectedChunks = parseInt(parts[2])
        expectedChunkIndex = 0
        musicBuffer = ""
        // Send acknowledgment
        bluetooth.uartWriteLine("ACK:START")
    } 
    else if (data.includes("CHUNK:")) {
        // Format: CHUNK:index:data|
        let parts = data.split(":")
        let chunkIndex = parseInt(parts[1])
        let chunkData = parts[2]
        
        if (chunkIndex === expectedChunkIndex) {
            musicBuffer += chunkData
            expectedChunkIndex++
            // Send acknowledgment with received chunk index
            bluetooth.uartWriteLine("ACK:" + chunkIndex)
            
            // If we have all chunks, play the music
            if (expectedChunkIndex === totalExpectedChunks) {
                playMusic(currentTempo, musicBuffer)
                bluetooth.uartWriteLine("COMPLETE")
                musicBuffer = ""
                expectedChunkIndex = 0
            }
        } else {
            // Request retransmission of expected chunk
            bluetooth.uartWriteLine("RETRY:" + expectedChunkIndex)
        }
    }
})

// Light sensor reporting
basic.forever(function () {
    lightLevel = input.lightLevel()
    bluetooth.uartWriteLine("LIGHT:" + lightLevel.toString())
    basic.pause(100)
})

// Initialize services
basic.showString("BLE")
bluetooth.startAccelerometerService()
bluetooth.startButtonService()
bluetooth.startTemperatureService()
bluetooth.startMagnetometerService()
bluetooth.startLEDService()
bluetooth.startUartService()