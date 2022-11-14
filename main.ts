input.onButtonPressed(Button.A, function () {
    // Write data to card
    MFRC522.write("Raik")
})
input.onButtonPressed(Button.AB, function () {
    leseID = !(leseID)
    if (leseID) {
        basic.setLedColor(0x00ff00)
    } else {
        basic.setLedColor(0xff0000)
    }
})
input.onButtonPressed(Button.B, function () {
    data = MFRC522.read()
    serial.writeLine("DATA:" + data)
})
let uhrzeit = ""
let datum = ""
let data = ""
let leseID = false
OLED12864_I2C.init(60)
serial.redirectToUSB()
OLED12864_I2C.showString(
0,
0,
"Hello!",
1
)
basic.pause(1000)
OLED12864_I2C.clear()
serial.writeLine("Start")
// Initialize RFID module
MFRC522.Init(
DigitalPin.C9,
DigitalPin.C8,
DigitalPin.C7,
DigitalPin.P0
)
serial.writeLine("Initialisiert")
leseID = true
if (leseID) {
    basic.setLedColor(0x00ff00)
} else {
    basic.setLedColor(0xff0000)
}
basic.forever(function () {
    if (leseID) {
        let id2 = MFRC522.getID().toString()
data = MFRC522.read()
        datum = PCF85063TP.getDate()
        uhrzeit = PCF85063TP.getTime()
        serial.writeLine("ID:" + id2)
        serial.writeLine("DATA:" + data)
        OLED12864_I2C.showString(
        0,
        0,
        datum,
        1
        )
        OLED12864_I2C.showString(
        0,
        1,
        uhrzeit,
        1
        )
        OLED12864_I2C.showString(
        0,
        2,
        id2,
        1
        )
        OLED12864_I2C.showString(
        0,
        3,
        data,
        1
        )
        basic.pause(1000)
        OLED12864_I2C.clear()
    }
})
