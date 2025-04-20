export const hashPassword = async (password: string) => {
    const msgUint8 = new TextEncoder().encode(password); // encode as (utf-8) Uint8Array
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8); // hash the message
    const hashArray = Array.from(new Uint8Array(hashBuffer)); // convert buffer to byte array
    return hashArray.map((byte) => byte.toString(16).padStart(2, '0')).join(''); // convert bytes to hex string
};
