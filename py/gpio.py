#!/usr/bin/python
import RPi.GPIO as GPIO
import sys
import time

GPIO.setmode(GPIO.BCM)
GPIO.setwarnings(False)
WHICH_PIN=int(sys.argv[1])
GPIO.setup(WHICH_PIN,GPIO.OUT)
print "Turning ON PIN: "+sys.argv[1] 
GPIO.output(WHICH_PIN,GPIO.HIGH)
