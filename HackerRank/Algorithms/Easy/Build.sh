#!/bin/bash

arr=(4 73 67 38 33)

g++ Grading-Student.cpp -o Grading-Student.o && ./Grading-Student.o

for ((i=0; i< ${#arr[@]}; i++))
do
  echo ${arr[$i]}
done
