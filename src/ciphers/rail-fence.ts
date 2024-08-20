// TODO: case sensitive, white space

/**
 * [Rail Fence cipher](https://en.wikipedia.org/wiki/Rail_fence_cipher) encryption
 *
 * @param plaintext text to be encrypted
 * @param options optional configuration for encryption
 * @param options.railCount number of successive "rails" of an imaginary fence
 * @returns ciphertext, the encrypted text
 *
 * @example
 * encrypt('WE ARE DISCOVERED FLEE AT ONCE')
 * // returns 'WECRUOERDSOEERNTNEAIVDAC'
 *
 * encrypt('GROUND CONTROL TO MAJOR TOM', { railCount: 6 })
 * // returns 'GRTRTOROONLOMUOTJNCOADM'
 */
export function encrypt(
    plaintext: string,
    options?: { railCount?: number },
): string {
    const { railCount = 3 } = options || {};

    plaintext = plaintext.replace(/\s/g, '');
    const ciphertextRails: string[] = new Array(railCount).fill('');

    let railIndex = 0;
    let direction = 1;
    for (const currentChar of plaintext.split('')) {
        ciphertextRails[railIndex] += currentChar;
        if (railCount === 1) {
            direction = 0;
        } else if (railIndex === 0) {
            direction = 1;
        } else if (railIndex === railCount - 1) {
            direction = -1;
        }
        railIndex += direction;
    }

    return ciphertextRails.join('');
}

/**
 * [Rail Fence cipher](https://en.wikipedia.org/wiki/Rail_fence_cipher) decryption
 *
 * @param ciphertext text to be decrypted
 * @param options configuration for decryption
 * @param options.railCount number of successive "rails" of an imaginary fence
 * @returns plaintext, the decrypted text
 *
 * @example
 * decrypt('WECRUOERDSOEERNTNEAIVDAC')
 * // returns 'WEAREDISCOVEREDFLEEATONCE'
 *
 * decrypt('GRTRTOROONLOMUOTJNCOADM', { railCount: 6 })
 * // returns 'GROUNDCONTROLTOMAJORTOM'
 */
export function decrypt(
    ciphertext: string,
    options?: { railCount?: number },
): string {
    const { railCount = 3 } = options || {};

    let plaintext = '';
    const ciphertextRails: string[] = new Array(railCount).fill('');
    const ciphertextRailsLengths: number[] = new Array(railCount).fill(0);

    let railIndex = 0;
    let direction = 1;
    for (let i = 0; i < ciphertext.length; i++) {
        ciphertextRailsLengths[railIndex] += 1;
        if (railCount === 1) {
            direction = 0;
        } else if (railIndex === 0) {
            direction = 1;
        } else if (railIndex === railCount - 1) {
            direction = -1;
        }
        railIndex += direction;
    }

    let tempCiphertext = ciphertext;
    for (const [
        railIndex,
        ciphertextRailsLength,
    ] of ciphertextRailsLengths.entries()) {
        ciphertextRails[railIndex] = tempCiphertext.substring(
            0,
            ciphertextRailsLength,
        );
        tempCiphertext = tempCiphertext.slice(ciphertextRailsLength);
    }

    railIndex = 0;
    direction = 1;
    for (let i = 0; i < ciphertext.length; i++) {
        plaintext += ciphertextRails[railIndex][0];
        ciphertextRails[railIndex] = ciphertextRails[railIndex].slice(1);
        if (railCount === 1) {
            direction = 0;
        } else if (railIndex === 0) {
            direction = 1;
        } else if (railIndex === railCount - 1) {
            direction = -1;
        }
        railIndex += direction;
    }

    return plaintext;
}
