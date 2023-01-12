/**
 * U = 1 D = 2
 * 
 * L = 3 R = 4
 * 
 * UU = 11
 * 
 * UD = 12
 * 
 * UL = 13
 * 
 * UR = 14
 * 
 * DU = 21
 * 
 * DD = 22
 * 
 * DL =  23
 * 
 * DR = 24
 * 
 * LU = 31
 * 
 * LD = 32
 * 
 * LL = 33
 * 
 * LR = 34
 * 
 * RU = 41
 * 
 * RD = 42
 * 
 * RL = 43
 * 
 * RR = 44
 */
input.onButtonPressed(Button.A, function () {
    radio.sendString("Stop")
})
input.onButtonPressed(Button.B, function () {
    if (Ready == 0) {
        Ready = 1
    }
})
let Ready = 0
Ready = 0
let Signal = 0
let Sending = 0
radio.setGroup(1)
radio.setTransmitPower(7)
basic.forever(function () {
    basic.pause(500)
    if (Ready == 1) {
        music.playTone(988, music.beat(BeatFraction.Eighth))
        if (input.acceleration(Dimension.Y) > 300) {
            Sending += 1
        } else if (input.acceleration(Dimension.Y) < -300) {
            Sending += 2
        } else if (input.acceleration(Dimension.X) < -300) {
            Sending += 3
        } else if (input.acceleration(Dimension.X) > 300) {
            Sending += 4
        } else if (input.acceleration(Dimension.Z) < -300) {
            Sending += 1
        } else if (input.acceleration(Dimension.Z) > 300) {
            Sending += 2
        }
        Signal += 1
        if (Signal == 1) {
            Sending = Sending * 10
        }
        if (Signal == 2) {
            radio.sendNumber(Sending)
            Ready = 0
            Signal = 0
            Sending = 0
        }
    }
})
