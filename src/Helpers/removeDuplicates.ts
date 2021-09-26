export function onlyUnique(value:string, index:number, self:Array<string>) {
    return self.indexOf(value) === index;
  }