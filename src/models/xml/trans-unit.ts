export class TransUnit {
  public id: string;
  public source: string;
  public target: string | undefined;

  constructor(id: string, source: string, target: string | undefined) {
    this.id = id;
    this.source = source;
    this.target = target;
  }
}
