all: dist/anagrammatist.js

clean:
	rm -rf dist

dist/anagrammatist.js: data/english.dic src/anagrammatist.js
	mkdir -p dist
	python tools/dictify.py data/english.dic > "$@"
	grep -v dictionary.js src/anagrammatist.js >> "$@"

