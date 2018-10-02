export class CategoryList {
  title: string
  slug: string

constructor(obj?: any){
  this.title = obj && obj.title || null;
  this.slug = obj && obj.slug || null;
}
}
