export function truncateBeforeChar(str, char) {
    const index = str.indexOf(char);
    if (index === -1) {
      // Return the original string if the character is not found
      return str;
    }
    // Return the substring before the character
    return str.substring(0, index);
  }
  
