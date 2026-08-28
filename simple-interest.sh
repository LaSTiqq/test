#!/bin/bash

echo "Enter the principal:"
read p

echo "Enter the rate of interest:"
read r

echo "Enter the time period:"
read t

s=$(echo "scale=2; ($p * $r * $t) / 100" | bc)

echo "Simple Interest: $s"