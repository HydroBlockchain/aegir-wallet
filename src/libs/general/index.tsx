import axios, { AxiosResponse } from "axios";
import { ecsign, bufferToHex, stripHexPrefix } from "ethereumjs-util";
import { IoutputECDSA, Isign, ItimeoutAxios, ItimeoutPromise } from "../../interfaces/Igeneral";

/**
 * Fetch that fails after timeout
 *
 * @param timeout - Timeout to fail request
 * @param options - Options to send with the request
 *
 * @returns - Promise resolving the request
 */
 export function timeoutFetch({ options, timeout = 500 }: ItimeoutAxios): Promise<any> {
	return Promise.race([
		axios(options),
		new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), timeout)),
	]);
}

/**
 * Fetch that fails after timeout
 *
 * @param promises - Collection of promses
 * @param timeout - Timeout to fail request
 *
 * @returns - Promise resolving the request
 */
export function timeoutPromises({ promises, timeout = 500 }: ItimeoutPromise): Promise<any> {
	return Promise.race([
		...promises,
		new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), timeout)),
	]);
}

export const tlc = (str: string) => str?.toLowerCase?.();

export const toLowerCaseEquals = (a: string, b: string) => {
	if (!a && !b) return false;
	return tlc(a) === tlc(b);
};

export function signECDSA({ messageHash, privateKey }: Isign): Promise<IoutputECDSA> {
  return new Promise(resolve => {
    const signature = ecsign(
      Buffer.from(stripHexPrefix(messageHash), 'hex'),
      Buffer.from(stripHexPrefix(privateKey), 'hex')
    );

    resolve({
      v: signature.v,
      r: bufferToHex(signature.r),
      s: bufferToHex(signature.s),
    })
  })
}