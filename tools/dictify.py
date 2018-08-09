#!/usr/bin/env python
import sys
with open(sys.argv[1],'r') as thedict:
    words = [word.strip().upper() for word in thedict.readlines()]
    entries = ['['+','.join([str(word.count(chr(ord('A')+c))) for c in xrange(26)])+']' for word in words]
    print('var dict_words=['+','.join(['"'+word+'"'for word in words])+'];')
    print('var dict=['+','.join(entries)+'];')
