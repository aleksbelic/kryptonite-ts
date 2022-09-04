import {ALPHABET_EN} from './globals.js';

/**
 * Checks if given char or string is upper case.
 * @param text
 * @returns true if given char or string is upper case
 * @author Aleksandar Belic Aleksanchez <aleks.belic@gmail.com>
 * @example
 * isUpperCase('a');
 * // returns false
 * isUpperCase('A');
 * // returns true
 */
export function isUpperCase(text: string): boolean {
  return text === text.toUpperCase();
}

/**
 * Returns key for the specified value in some given map.
 * @param map
 * @param value - value whose key we're looking for
 * @returns key
 * @author Aleksandar Belic Aleksanchez <aleks.belic@gmail.com>
 * @example
 * getMapKeyByValue(new Map([['a', 'alpha'],['b', 'beta']]),'alpha')
 * // returns 'a'
 * getMapKeyByValue(new Map([['a', 'alpha'],['b', 'beta']]),'gama')
 * // returns undefined
 */
export function getMapKeyByValue(
  map: Map<string, string>,
  value: string
): string | undefined {
  if (!(map instanceof Map)) {
    throw Error('Invalid param - please provide an intance of Map.');
  }
  return [...map].find(([k, v]) => v === value)?.[0];
}

/**
 *
 * @param text
 * @returns
 * @author Aleksandar Belic Aleksanchez <aleks.belic@gmail.com>
 */
export function getCharsFromText(text: string): string[] {
  // TODO
  return [];
}

/**
 * TODO
 * @param char - letter in alphabet whose shifted pair we're looking for
 * @param shift - number of left or right alphabet rotations
 * @param alphabet - used alphabet
 * @returns shifted character
 * @author Aleksandar Belic Aleksanchez <aleks.belic@gmail.com>
 */
export function getShiftedChar(
  char: string,
  shift: number,
  alphabet = ALPHABET_EN
): string | undefined {
  let shiftedChar: string | undefined = undefined;
  const charIndexInAlphabet = alphabet.indexOf(char.toLowerCase());
  if (charIndexInAlphabet !== -1) {
    shiftedChar = alphabet[(charIndexInAlphabet + shift) % alphabet.length];
  }
  return shiftedChar;
}

/**
 * Checks if user defined alphabet is valid.
 * @param alphabet - user defined alphabet being checked
 * @returns true
 * @author Aleksandar Belic Aleksanchez <aleks.belic@gmail.com>
 */
export function checkAlphabet(alphabet: string[]): boolean | never {
  if (!Array.isArray(alphabet)) {
    throw Error(
      'Invalid alphabet: please provide an array of single-letter chars.'
    );
  }
  if (alphabet.length < 2) {
    throw Error(
      'Invalid alphabet: alphabet needs be at least 2 characters long.'
    );
  }
  for (const char of alphabet) {
    if (
      typeof char !== 'string' ||
      char.length !== 1 ||
      char.length !== char.trim().length
    ) {
      throw Error(
        'Invalid alphabet: alphabet should contain only single-letter chars.'
      );
    }
  }
  if (
    alphabet.toString().toLowerCase() !==
    [...new Set(alphabet.map(char => char.toLowerCase()))].toString()
  ) {
    throw Error('Invalid alphabet: alphabet must not contain duplicates.');
  }
  return true;
}
