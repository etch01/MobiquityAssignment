type StrOrNull =  string | null; //Function may return string or null
export const truncateString = (string:string, maxLength:number = 50): StrOrNull  => {
    if (!string) return null;
    if (string.length <= maxLength) return string;
    return `${string.substring(0, maxLength)}...`;
  };