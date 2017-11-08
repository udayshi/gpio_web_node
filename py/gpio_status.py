#!/usr/bin/python
import RPi.GPIO as GPIO
import sys
import time

GPIO.setmode(GPIO.BCM)
GPIO.setwarnings(False)

inputArgs = sys.argv
pins={}

for pin in inputArgs[1:]:
	WHICH_PIN=int(pin)
	GPIO.setup(WHICH_PIN,GPIO.OUT)
	if GPIO.input(WHICH_PIN):
		pins["pin_"+pin]="ON"
	else:
		pins["pin_"+pin]="OFF"


print pins
	
