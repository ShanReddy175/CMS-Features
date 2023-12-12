

/**
     * 
     * @param {Number} count - Alphabet count
 */

export async function createDynamicID(count) {
    let alphabets = [];
    let newId = '';
    const dragElements = document.querySelectorAll('div');
    
    for (let i = 0; i < count; i++) {
        // Generate a random number between 0 and 25 (inclusive)
        const randomNumber = Math.floor(Math.random() * 26);
    
        // Convert the random number to a character code (A: 65, B: 66, ..., Z: 90)
        const randomCharcode = 65 + randomNumber;
    
        // Convert the character code to an alphabet character
        const randomAlphabet = String.fromCharCode(randomCharcode);
    
        alphabets.push(randomAlphabet);
    }
    newId = `cms-${alphabets.join("").toLowerCase()}`;
    let checkIdUnique = [...dragElements].some(ele => ele.id === newId);
    if(!checkIdUnique) return newId;
    createDynamicID(count)
};