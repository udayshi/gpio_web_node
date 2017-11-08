#!/usr/bin/python
import RPi.GPIO as GPIO
import sys
import time

GPIO.setmode(GPIO.BCM)
GPIO.setwarnings(False)
WHICH_PIN=int(sys.argv[1])
GPIO.setup(WHICH_PIN,GPIO.OUT)

if not GPIO.input(WHICH_PIN):
	print "ON"
else:
	print "OFF"
GPIO.output(WHICH_PIN,not GPIO.input(WHICH_PIN))
