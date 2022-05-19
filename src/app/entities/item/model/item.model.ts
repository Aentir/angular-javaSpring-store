export class Item {
    public id: number | undefined;
    public name: string;
    public price: number;
    public description?: string;
    public image?: string;


  constructor(
    id: number , 
    name: string, 
    price: number, 
    description?: string, 
    image?: string
) {
    this.id = id
    this.name = name
    this.price = price
    this.description = description
    this.image = image
  }
    
}