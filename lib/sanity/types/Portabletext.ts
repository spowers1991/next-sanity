export interface PortableTextChild {
  _type: string;
  text: string;
}

export interface PortableTextBlock {
  _type: "block";
  children: PortableTextChild[];
}
